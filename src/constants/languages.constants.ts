import { LanguageDescription } from '@codemirror/language';

export const AVAILABLE_EDITOR_LANGUAGES = [
  LanguageDescription.of({
    name: 'C',
    extensions: ['c', 'h', 'ino'],
    load() {
      return import('@codemirror/lang-cpp').then((m) => m.cpp());
    },
  }),
  LanguageDescription.of({
    name: 'C++',
    alias: ['cpp'],
    extensions: ['cpp', 'c++', 'cc', 'cxx', 'hpp', 'h++', 'hh', 'hxx'],
    load() {
      return import('@codemirror/lang-cpp').then((m) => m.cpp());
    },
  }),
];
