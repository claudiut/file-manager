import sortBy from 'lodash/sortBy';

import { File, Files } from '../types/File';
import Directory from '../types/Directory';

export const getFilename = (path: string): string => {
    const parts = path.split('/');
    return parts[parts.length - 1];
};

export const getSelectedFile = (files: Files, path: string): File | undefined => (
    files.find((file: File) => file.path === path || path.indexOf(`${file.path}/`) === 0)
);

export const getParentPath = (path: string): string => {
    const parts = path.split('/');
    return parts.slice(0, -1).join('/') || '/';
};

export const alphaSortFilesOfDir = (dir: Directory): Directory => ({
    ...dir,
    files: sortBy(dir.files, ({ path }) => getFilename(path).toLowerCase()),
});

export const getDirectoryOfFile = (file: File, directories: Array<Directory>): Directory => (
        <Directory>directories.find(
            ({ files }) => files.some(({ path }) => path === file.path),
        )
);
