import * as React from 'react'

type UIContextProviderProps = {
  children: React.ReactNode
}

const UIContext = React.createContext<
  | {
      selectedUnitID: string
      setSelectedUnitID: React.Dispatch<React.SetStateAction<string>>
      selectedGameCardID: string
      setSelectedGameCardID: React.Dispatch<React.SetStateAction<string>>
    }
  | undefined
>(undefined)

export function UIContextProvider({ children }: UIContextProviderProps) {
  const [selectedUnitID, setSelectedUnitID] = React.useState('')
  const [selectedGameCardID, setSelectedGameCardID] = React.useState('')
  return (
    <UIContext.Provider
      value={{
        selectedUnitID,
        setSelectedUnitID,
        selectedGameCardID,
        setSelectedGameCardID,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUIContext() {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIContextProvider')
  }
  return context
}
