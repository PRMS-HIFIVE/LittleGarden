import {create} from 'zustand';

interface SidebarStore {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
    isSidebarOpen: false,
    openSidebar: () => set({isSidebarOpen: true}),
    closeSidebar: () => set({isSidebarOpen: false}),
    toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen})),
}))

export default useSidebarStore;