import * as React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import schema from "./auto-suggest.schema.json";
import AutoSuggest, { AutoSuggestManagedClasses, AutoSuggestProps } from "./auto-suggest";
import { ListboxItemProps } from "../listbox-item";
import Documentation from "./.tmp/documentation";

function ListboxItemPropFactory(id: string): ListboxItemProps {
    return {
        managedClasses: {
            listboxItem: "listboxItem",
            listboxItem__disabled: "listboxItem__disabled",
            listboxItem__selected: "listboxItem__selected",
        },
        id,
        value: id,
        role: "option",
        displayString: "Option-" + id,
        children: "Child-" + id,
    };
}

const managedClasses: AutoSuggestManagedClasses = {
    managedClasses: {
        autoSuggest: "select",
        autoSuggest__disabled: "select__disabled",
        autoSuggest_menu: "select_menu",
        autoSuggest_menu__open: "select_menu__open",
    },
};

const examples: ComponentFactoryExample<AutoSuggestProps> = {
    name: "Auto Suggest",
    component: AutoSuggest,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        ...managedClasses,
        placeholder: "Type something....",
        children: [
            {
                id: "listbox-item",
                props: {
                    ...ListboxItemPropFactory("a"),
                },
            },
            {
                id: "listbox-item",
                props: {
                    ...ListboxItemPropFactory("b"),
                },
            },
            {
                id: "listbox-item",
                props: {
                    ...ListboxItemPropFactory("c"),
                },
            },
        ],
    },
    data: [
        {
            ...managedClasses,
            placeholder: "placeholder",
            children: [
                {
                    id: "listbox-item",
                    props: {
                        ...ListboxItemPropFactory("value 1"),
                        children: "select option 1",
                        selected: true,
                    },
                },
                {
                    id: "listbox-item",
                    props: {
                        ...ListboxItemPropFactory("value 2"),
                        children: "select option 2",
                    },
                },
                {
                    id: "listbox-item",
                    props: {
                        ...ListboxItemPropFactory("value 3"),
                        children: "select option 3",
                    },
                },
            ],
        },
    ],
};

export default examples;
