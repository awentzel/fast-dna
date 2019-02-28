import * as React from "react";
import {
    ManagedClasses,
    SelectClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";
import { ListboxItemProps } from "../listbox-item";
import { AutoSuggestState } from "./auto-suggest";

export interface AutoSuggestManagedClasses
    extends ManagedClasses<AutoSuggestClassNameContract> {}
export interface AutoSuggestUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface AutoSuggestHandledProps extends AutoSuggestManagedClasses {
    /**
     * Custom function to render the input box of the control
     */
    inputRegion?: (props: AutoSuggestProps, state: AutoSuggestState) => React.ReactNode;

    /**
     * Specifies that the drop-down list is open
     */
    isMenuOpen?: boolean;

    /**
     * Specifies that the control is disabled
     */
    disabled?: boolean;

    /**
     * String displayed when there text entered
     */
    placeholder?: string;

    /**
     * The onValueChange event handler
     */
    onValueChange?: (
        newValue: string | string[],
        selectedItems: ListboxItemProps[],
        displayString: string
    ) => void;

    /**
     * Whether a listitem should automatically get focus when this component is mounted
     * (multi-select only)
     */
    autoFocus?: boolean;

    /**
     * The aria-labelledby attribute to link the auto-suggest to an existing
     * element that provides it an accessible name
     */
    labelledBy?: string;
}

export type AutoSuggestProps = AutoSuggestHandledProps & AutoSuggestUnhandledProps;
