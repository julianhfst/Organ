export type ButtonType =
  | ''
  | 'Default'
  | 'DefaultRed'
  | 'Header'
  | 'Dark'
  | 'ColoredShadow'
  | 'Outline';

export const ButtonStyles = {
  Default:
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
  DefaultRed:
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
  Header:
    'inline-block text-sm px-4 py-2 leading-none border rounded text-gray-200 border-gray-200 hover:border-transparent hover:text-gray-800 hover:bg-gray-200 mt-4 lg:mt-0 mr-4',
  Dark: 'text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2',
  ColoredShadow:
    'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2',
  Outline:
    'text-gray-900 hover:text-white border border-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
};
