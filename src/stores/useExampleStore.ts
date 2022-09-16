import create from 'zustand';

interface IExampleStore {
  example: string;
  setExample: (props) => void;
}

export const useLoginStore = create<IExampleStore>((set) => ({
  example: 'Exmple',
  setExample: (props: string) => set(() => ({ example: props })),
}));
