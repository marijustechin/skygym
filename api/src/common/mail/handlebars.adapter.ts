import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { inline } from '@css-inline/css-inline';
import { globSync } from 'glob';
import type { TemplateAdapter } from '@nestjs-modules/mailer/dist/interfaces/template-adapter.interface';
import type { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

interface AdapterConfig {
  inlineCssOptions?: Record<string, unknown>;
  inlineCssEnabled?: boolean;
}

interface PrecompileResult {
  templateExt: string;
  templateName: string;
  templateDir: string;
  templatePath: string;
}

interface TemplateOptions {
  dir?: string;
  options?: Record<string, unknown>;
}

interface RuntimeOptions {
  partials?: { dir: string; options?: Record<string, unknown> };
  data?: Record<string, unknown>;
}

export class HandlebarsAdapter implements TemplateAdapter {
  private precompiledTemplates: Record<string, HandlebarsTemplateDelegate> = {};
  private config: AdapterConfig = {
    inlineCssOptions: {},
    inlineCssEnabled: true,
  };

  constructor(
    helpers?: Record<string, handlebars.HelperDelegate>,
    config?: AdapterConfig,
  ) {
    handlebars.registerHelper('concat', (...args: unknown[]) => {
      const sliced = args.slice(0, -1);
      return sliced.join('');
    });
    if (helpers) {
      handlebars.registerHelper(helpers);
    }
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  compile(
    mail: { data: { template?: string; context?: unknown; html?: string } },
    callback: (err?: Error | null, body?: string) => void,
    mailerOptions: MailerOptions,
  ): void {
    const precompile = (
      template: string,
      cb: (err?: Error | null) => void,
      options: TemplateOptions,
    ): PrecompileResult => {
      const templateBaseDir = options.dir ?? '';
      const templateExt = path.extname(template) || '.hbs';
      let templateName = path.basename(template, path.extname(template));
      const templateDir = path.isAbsolute(template)
        ? path.dirname(template)
        : path.join(templateBaseDir, path.dirname(template));
      const templatePath = path.join(templateDir, templateName + templateExt);
      templateName = path
        .relative(templateBaseDir, templatePath)
        .replace(templateExt, '');

      if (!this.precompiledTemplates[templateName]) {
        try {
          const source = fs.readFileSync(templatePath, 'utf-8');
          this.precompiledTemplates[templateName] = handlebars.compile(
            source,
            options.options ?? {},
          );
        } catch (err) {
          cb(err instanceof Error ? err : new Error(String(err)));
        }
      }

      return { templateExt, templateName, templateDir, templatePath };
    };

    const template = mail.data.template;
    if (!template) {
      return callback(new Error('No template specified'));
    }

    const templateOpts: TemplateOptions =
      ((mailerOptions as Record<string, unknown>).template as
        | TemplateOptions
        | undefined) ?? {};

    const precompileResult = precompile(template, callback, templateOpts);

    const runtimeOptions: RuntimeOptions = ((
      mailerOptions as Record<string, unknown>
    ).options as RuntimeOptions | undefined) ?? {
      partials: undefined,
      data: {},
    };

    if (runtimeOptions.partials) {
      const partialPath = path
        .join(runtimeOptions.partials.dir, '**', '*.hbs')
        .replace(/\\/g, '/');
      const files = globSync(partialPath);
      for (const file of files) {
        const { templateName: partialName, templatePath: partialTemplatePath } =
          precompile(file, () => {}, {
            dir: runtimeOptions.partials.dir,
            options: runtimeOptions.partials.options,
          });
        const relDir = path.relative(
          runtimeOptions.partials.dir,
          path.dirname(partialTemplatePath),
        );
        handlebars.registerPartial(
          path.join(relDir, partialName),
          fs.readFileSync(partialTemplatePath, 'utf-8'),
        );
      }
    }

    const compiled = this.precompiledTemplates[precompileResult.templateName];
    if (!compiled) {
      return callback(new Error(`Template "${template}" not found`));
    }

    const rendered = compiled(mail.data.context ?? {}, {});

    if (this.config.inlineCssEnabled) {
      try {
        mail.data.html = inline(rendered, this.config.inlineCssOptions ?? {});
      } catch (e) {
        return callback(e instanceof Error ? e : new Error(String(e)));
      }
    } else {
      mail.data.html = rendered;
    }

    return callback();
  }
}
