import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, render, shallow } from "enzyme";
import AutoSuggest, { AutoSuggestUnhandledProps } from "./auto-suggest";
import ListboxItem from "../listbox-item";
import { KeyCodes } from "@microsoft/fast-web-utilities";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const itemA: JSX.Element = <ListboxItem id="a" value="a" displayString="a" />;
const itemADisabled: JSX.Element = (
    <ListboxItem id="a" value="a" displayString="a" disabled={true} />
);
const itemB: JSX.Element = <ListboxItem id="b" value="b" displayString="ab" />;
const itemC: JSX.Element = <ListboxItem id="c" value="c" displayString="abc" />;

const container: HTMLDivElement = document.createElement("div");
document.body.appendChild(container);

describe("select", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((AutoSuggest as any).name).toBe(AutoSuggest.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<AutoSuggest />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: AutoSuggestUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<AutoSuggest {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("initial default state is correct", (): void => {
        const rendered: any = mount(
            <AutoSuggest>
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        expect(rendered.state("currentValue").length).toBe(0);
        expect(rendered.state("focusedItem")).toBe(undefined);
        expect(rendered.state("isMenuOpen").length).toBe(false);
    });

    test("default input region attributes are set correctly", (): void => {
        const rendered: any = mount(
            <AutoSuggest label="test-label">
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        const input: any = rendered.find("input");
        expect(input.prop("aria-label")).toEqual("test-label");
    });

    test("menu should open on input region click or text entry", (): void => {
        const rendered: any = mount(
            <AutoSuggest>
                {itemA}
                {itemB}
                {itemC}
            </AutoSuggest>
        );

        const input: any = rendered.find("input");
        expect(rendered.state("isMenuOpen")).toBe(false);
        input.simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(true);
    });

    // test("provided callback function is called and value changes when selection changes", (): void => {
    //     const onValueChange: any = jest.fn();
    //     const rendered: any = mount(
    //         <Select onValueChange={onValueChange} defaultSelection={["b"]}>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>
    //     );

    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(onValueChange).toHaveBeenCalledTimes(1);

    //     rendered.simulate("click");
    //     expect(rendered.state("isMenuOpen")).toBe(true);

    //     rendered
    //         .find('[displayString="a"]')
    //         .simulate("keydown", { keyCode: KeyCodes.space });
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(onValueChange).toHaveBeenCalledTimes(2);
    // });

    // test("provided callback function is not called when selected item is reselected", (): void => {
    //     const onValueChange: any = jest.fn();
    //     const rendered: any = mount(
    //         <Select onValueChange={onValueChange} defaultSelection={["b"]}>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>
    //     );

    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(onValueChange).toHaveBeenCalledTimes(1);

    //     rendered.simulate("click");
    //     expect(rendered.state("isMenuOpen")).toBe(true);

    //     rendered
    //         .find('[displayString="ab"]')
    //         .simulate("keydown", { keyCode: KeyCodes.space });
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(onValueChange).toHaveBeenCalledTimes(1);
    // });

    // test("Arrow keys open menu and increment selection in single select mode", (): void => {
    //     const rendered: any = mount(
    //         <Select>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>,
    //         { attachTo: container }
    //     );

    //     expect(rendered.state("selectedItems").length).toBe(0);
    //     expect(rendered.state("isMenuOpen")).toBe(false);

    //     rendered.simulate("keydown", { keyCode: KeyCodes.arrowDown });
    //     expect(rendered.state("isMenuOpen")).toBe(true);
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(rendered.state("selectedItems")[0].id).toBe("a");

    //     rendered
    //         .find('[displayString="a"]')
    //         .simulate("keydown", { keyCode: KeyCodes.arrowDown });
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(rendered.state("selectedItems")[0].id).toBe("b");

    //     rendered
    //         .find('[displayString="ab"]')
    //         .simulate("keydown", { keyCode: KeyCodes.arrowDown });
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(rendered.state("selectedItems")[0].id).toBe("c");

    //     rendered
    //         .find('[displayString="abc"]')
    //         .simulate("keydown", { keyCode: KeyCodes.arrowDown });
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(rendered.state("selectedItems")[0].id).toBe("c");

    //     rendered
    //         .find('[displayString="abc"]')
    //         .simulate("keydown", { keyCode: KeyCodes.space });
    //     expect(rendered.state("isMenuOpen")).toBe(false);

    //     rendered.simulate("keydown", { keyCode: KeyCodes.arrowUp });
    //     expect(rendered.state("isMenuOpen")).toBe(true);
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(rendered.state("selectedItems")[0].id).toBe("b");
    // });

    // test("Arrow up with no selection opens menu and select last item in single select mode", (): void => {
    //     const rendered: any = mount(
    //         <Select>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>
    //     );

    //     expect(rendered.state("selectedItems").length).toBe(0);
    //     expect(rendered.state("isMenuOpen")).toBe(false);

    //     rendered.simulate("keydown", { keyCode: KeyCodes.arrowUp });
    //     expect(rendered.state("isMenuOpen")).toBe(true);
    //     expect(rendered.state("selectedItems").length).toBe(1);
    //     expect(rendered.state("selectedItems")[0].id).toBe("c");
    // });

    // test("Default displaystring and value strings are correct", (): void => {
    //     const rendered: any = mount(
    //         <Select multiselectable={true} name="test">
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>,
    //         { attachTo: container }
    //     );

    //     expect(rendered.state("displayString")).toBe("");
    //     expect(rendered.state("value")).toEqual([]);

    //     rendered
    //         .find('[displayString="a"]')
    //         .simulate("keydown", { keyCode: KeyCodes.space });
    //     expect(rendered.state("displayString")).toBe("a");
    //     expect(rendered.state("value")).toEqual(["a"]);

    //     rendered
    //         .find('[displayString="a"]')
    //         .simulate("keydown", { keyCode: KeyCodes.arrowDown, shiftKey: true });
    //     expect(rendered.state("displayString")).toBe("a, ab");
    //     expect(rendered.state("value")).toEqual(["a", "b"]);
    // });

    // test("Custom display formatter is called", (): void => {
    //     const displayFormatter: any = jest.fn();
    //     displayFormatter.mockReturnValue("formatted display");
    //     const rendered: any = mount(
    //         <Select displayStringFormatter={displayFormatter}>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>,
    //         { attachTo: container }
    //     );

    //     expect(displayFormatter).toHaveBeenCalledTimes(1);

    //     rendered.simulate("keydown", { keyCode: KeyCodes.arrowUp });
    //     expect(displayFormatter).toHaveBeenCalledTimes(2);
    // });

    // test("Custom display render function is called", (): void => {
    //     const displayRenderFn: any = jest.fn();
    //     displayRenderFn.mockReturnValue("Test");
    //     const rendered: any = mount(
    //         <Select trigger={displayRenderFn}>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>,
    //         { attachTo: container }
    //     );
    //     expect(displayRenderFn).toHaveBeenCalledTimes(2);
    // });

    // test("Hidden select element exists and it's value and props are populated", (): void => {
    //     const rendered: any = mount(
    //         <Select
    //             multiselectable={true}
    //             name="testName"
    //             form="testForm"
    //             required={true}
    //         >
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>,
    //         { attachTo: container }
    //     );

    //     const select: any = rendered.find("select");
    //     expect(select.prop("value")).toEqual([]);
    //     expect(select.prop("multiple")).toBe(true);
    //     expect(select.prop("required")).toBe(true);
    //     expect(select.prop("name")).toBe("testName");
    //     expect(select.prop("form")).toBe("testForm");

    //     rendered
    //         .find('[displayString="a"]')
    //         .simulate("keydown", { keyCode: KeyCodes.space });
    //     expect(rendered.find("select").prop("value")).toEqual(["a"]);

    //     rendered
    //         .find('[displayString="a"]')
    //         .simulate("keydown", { keyCode: KeyCodes.arrowDown, shiftKey: true });
    //     expect(rendered.find("select").prop("value")).toEqual(["a", "b"]);
    // });

    // test("IsMenuOpen prop set to false overrides default behavior in single select mode", (): void => {
    //     const rendered: any = mount(
    //         <Select isMenuOpen={false}>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>
    //     );

    //     rendered.simulate("click");
    //     expect(rendered.state("isMenuOpen")).toBe(false);
    // });

    // test("IsMenuOpen prop set to true overrides default behavior in single select mode", (): void => {
    //     const rendered: any = mount(
    //         <Select isMenuOpen={true}>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>
    //     );

    //     expect(rendered.state("isMenuOpen")).toBe(true);
    // });

    // test("IsMenuOpen prop set to false overrides default behavior in multiple select mode", (): void => {
    //     const rendered: any = mount(
    //         <Select isMenuOpen={false} multiselectable={true}>
    //             {itemA}
    //             {itemB}
    //             {itemC}
    //         </Select>
    //     );

    //     expect(rendered.state("isMenuOpen")).toBe(false);
    // });
});
