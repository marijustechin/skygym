import * as handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class TemplateService {
  private templates: Map<string, handlebars.TemplateDelegate> = new Map();
  private readonly templatesPath = join(__dirname, 'templates');

  renderTemplate(
    template: string,
    context: Record<string, string>,
  ): { html: string; error: string | null } {
    if (!this.templates.has(template)) {
      const templatePath = join(this.templatesPath, `${template}.hbs`);

      if (!existsSync(templatePath)) {
        return { html: '', error: `Template "${template}" not found` };
      }

      const templateContent = readFileSync(templatePath, 'utf-8');
      this.templates.set(template, handlebars.compile(templateContent));
    }

    const compiledTemplate = this.templates.get(template);
    if (!compiledTemplate) {
      return {
        html: '',
        error: `Failed to retrieve compiled template "${template}". This should not happen.`,
      };
    }

    try {
      return { html: compiledTemplate(context), error: null };
    } catch (error) {
      return {
        html: '',
        error: `Error rendering template "${template}": ${error}`,
      };
    }
  }
}
