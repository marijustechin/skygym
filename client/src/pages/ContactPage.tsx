import { PageTitle } from '../components/PageTitle';

export const ContactPage = () => {
  return (
    <main className="sg-container min-h-[70vh] z-0">
      <PageTitle>Kontaktai</PageTitle>
      <div className="relative">
        <div className="absolute h-[60rem] w-[60rem] rounded-full bg-slate-400 -translate-x-1/2"></div>
      </div>
    </main>
  );
};
