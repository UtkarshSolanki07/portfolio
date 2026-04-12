import { create } from 'zustand'

interface PortfolioState {
  // Loading
  isLoading: boolean
  loadingProgress: number
  setLoading: (loading: boolean) => void
  setLoadingProgress: (progress: number) => void

  // Scene
  activeScene: number
  setActiveScene: (scene: number) => void

  // Easter Eggs
  hardcoreMode: boolean
  toggleHardcoreMode: () => void
  attitudeCount: number
  incrementAttitude: () => void
  resetAttitude: () => void
  attitudeUnlocked: boolean

  // Pipebomb
  showPipebomb: boolean
  setShowPipebomb: (show: boolean) => void

  // Menu
  activeMenuItem: number
  setActiveMenuItem: (index: number) => void

  // Audio
  isMuted: boolean
  toggleMute: () => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  // Loading
  isLoading: true,
  loadingProgress: 0,
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  // Scene
  activeScene: 0,
  setActiveScene: (scene) => set({ activeScene: scene }),

  // Easter Eggs
  hardcoreMode: false,
  toggleHardcoreMode: () =>
    set((state) => ({ hardcoreMode: !state.hardcoreMode })),
  attitudeCount: 0,
  incrementAttitude: () =>
    set((state) => {
      const next = state.attitudeCount + 1
      return {
        attitudeCount: next,
        attitudeUnlocked: next >= 100,
      }
    }),
  resetAttitude: () => set({ attitudeCount: 0, attitudeUnlocked: false }),
  attitudeUnlocked: false,

  // Pipebomb
  showPipebomb: false,
  setShowPipebomb: (show) => set({ showPipebomb: show }),

  // Menu
  activeMenuItem: 0,
  setActiveMenuItem: (index) => set({ activeMenuItem: index }),

  // Audio
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}))
