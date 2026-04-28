import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);

  return (
    <>
      <h1>{dict.public.home_page.title}</h1>
      <div className="w-full mx-auto text-center text-2xl uppercase">
        {dict.public.home_page.subTitle}{' '}
        <span className="font-semibold text-emerald-800">
          {dict.public.home_page.subTitleSpan}
        </span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem rem
          ipsa eius quo magnam dolorem ullam obcaecati pariatur doloribus nisi
          fugiat dicta, vel veniam facere necessitatibus, nemo similique sed
          vitae ducimus quasi assumenda nulla minima consequatur. Illum hic
          quod, asperiores voluptate blanditiis ut. Perferendis labore
          explicabo, voluptate fugit magni alias.
        </p>
      </div>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          doloremque necessitatibus excepturi adipisci alias repudiandae minima
          earum, sapiente, minus deserunt eos! Sed, earum, eius necessitatibus
          vitae illo quisquam, ipsum dolores velit aperiam perspiciatis officia
          perferendis! Error atque facilis ullam molestias ex veritatis quo
          voluptate possimus? Consequatur magni quibusdam labore temporibus.
        </p>
      </section>
    </>
  );
}
