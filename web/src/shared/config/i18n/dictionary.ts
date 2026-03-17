import ltPublic from './dictionaries/lt/public.json';
import ltForms from './dictionaries/lt/forms.json';

export type Dictionary = {
  public: typeof ltPublic;
  forms: typeof ltForms;
};

export type PublicDictionary = Dictionary['public'];
export type FormsDictionary = Dictionary['forms'];
