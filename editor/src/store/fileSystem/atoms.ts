import { FileNodeState } from '@kartagraph-editor/domain/fileSystem/types';
import { atom } from 'jotai';

export const fsNodeAtom = atom<FileNodeState[]>([]);
export const fileAtom = atom<File | null>(null);
