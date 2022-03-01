import React from "react"
import MigrationModal from "./migration-modal"
import { render, screen } from "@testing-library/react"
import { migrationmodalInfo, MigrationModalPromos } from "./use-migration-modal"
import { ThemeProvider } from "styled-components"
import { DarkTheme } from "@netdata/netdata-ui"
import "@testing-library/jest-dom/extend-expect"

jest.mock("react-use", () => ({
  useLocalStorage: jest.fn(() => ["NONE", jest.fn()]),
}))

import { useLocalStorage } from "react-use"

describe("MigrationModal", () => {
  afterEach(() => jest.clearAllMocks())

  it("should render modal with PROMO_SIGN_UP_CLOUD ", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal userStatus="UNKNOWN" nodeClaimedStatus="NOT_CLAIMED" />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_SIGN_UP_CLOUD].title)
    ).toBeInTheDocument()
    expect(screen.getByTestId("body-footer")).toBeInTheDocument()
  })

  it("should render modal with PROMO_SIGN_IN_CLOUD ", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal userStatus="UNKNOWN" nodeClaimedStatus="CLAIMED" />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_SIGN_IN_CLOUD].title)
    ).toBeInTheDocument()
    expect(screen.getByTestId("body-footer")).toBeInTheDocument()
  })

  it("should render modal with PROMO_IVNITED_TO_SPACE (LOGGED_IN)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal
          userStatus="LOGGED_IN"
          nodeClaimedStatus="CLAIMED"
          userNodeAccess="NO_ACCESS"
        />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.queryByTestId("cta2")).not.toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_IVNITED_TO_SPACE].title)
    ).toBeInTheDocument()
    expect(screen.getByTestId("body-footer")).toBeInTheDocument()
  })

  it("should render modal with PROMO_IVNITED_TO_SPACE (LOGGED_OUT)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal
          userStatus="LOGGED_OUT"
          nodeClaimedStatus="CLAIMED"
          userNodeAccess="NO_ACCESS"
        />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.queryByTestId("cta2")).not.toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_IVNITED_TO_SPACE].title)
    ).toBeInTheDocument()
    expect(screen.getByTestId("body-footer")).toBeInTheDocument()
  })

  it("should render modal with PROMO_CLAIM_NODE (LOGGED_IN)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal userStatus="LOGGED_IN" nodeClaimedStatus="NOT_CLAIMED" />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_CLAIM_NODE].title)
    ).toBeInTheDocument()
    expect(screen.getByTestId("body-footer")).toBeInTheDocument()
  })

  it("should render modal with PROMO_CLAIM_NODE (LOGGED_OUT)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal userStatus="LOGGED_OUT" nodeClaimedStatus="NOT_CLAIMED" />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_CLAIM_NODE].title)
    ).toBeInTheDocument()
    expect(screen.getByTestId("body-footer")).toBeInTheDocument()
  })

  it("should render modal with PROMO_TO_USE_NEW_DASHBAORD (LOGGED_IN)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => [undefined, jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal userStatus="LOGGED_IN" userNodeAccess="ACCESS_OK" nodeLiveness="LIVE" />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_TO_USE_NEW_DASHBAORD].title)
    ).toBeInTheDocument()
    expect(screen.queryByTestId("body-footer")).not.toBeInTheDocument()
  })

  it("should render modal with PROMO_TO_USE_NEW_DASHBAORD (LOGGED_OUT)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => [undefined, jest.fn()]))
    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal userStatus="LOGGED_OUT" userNodeAccess="ACCESS_OK" nodeLiveness="LIVE" />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.PROMO_TO_USE_NEW_DASHBAORD].title)
    ).toBeInTheDocument()
    expect(screen.queryByTestId("body-footer")).not.toBeInTheDocument()
  })

  it("should render modal with FALLBACK_TO_AGENT (LOGGED_IN)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))

    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal
          nodeClaimedStatus="CLAIMED"
          userStatus="LOGGED_IN"
          userNodeAccess="ACCESS_OK"
          nodeLiveness="NOT_LIVE"
        />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.FALLBACK_TO_AGENT].title)
    ).toBeInTheDocument()
    expect(screen.queryByTestId("body-footer")).not.toBeInTheDocument()
  })

  it("should render modal with FALLBACK_TO_AGENT (LOGGED_OUT)", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))

    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal
          nodeClaimedStatus="CLAIMED"
          userStatus="LOGGED_OUT"
          userNodeAccess="ACCESS_OK"
          nodeLiveness="NOT_LIVE"
        />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.FALLBACK_TO_AGENT].title)
    ).toBeInTheDocument()
    expect(screen.queryByTestId("body-footer")).not.toBeInTheDocument()
  })

  it("should render modal with NO_INFO_FALLBACK_TO_AGENT ", () => {
    useLocalStorage.mockImplementation(jest.fn(() => ["CLOUD", jest.fn()]))

    render(
      <ThemeProvider theme={DarkTheme}>
        <MigrationModal />
      </ThemeProvider>
    )
    expect(screen.getByTestId("cta1")).toBeInTheDocument()
    expect(screen.getByTestId("cta2")).toBeInTheDocument()
    expect(
      screen.getByText(migrationmodalInfo[MigrationModalPromos.NO_INFO_FALLBACK_TO_AGENT].title)
    ).toBeInTheDocument()
    expect(screen.queryByTestId("body-footer")).not.toBeInTheDocument()
  })
})
