type ShapeNameTypes = "circle" | "square" | "star" | "triangle"

type ArrayItemTypes = {
    color: string,
    shape: ShapeNameTypes,
    value: number
}

type OptionArrayTypes = {
    type: string,
    array: Array<number | string>
}

type SwitchOptionProps = {
    type: "shape" | "color" | "value";
    content: string | number;
    switchOption: Function;
}

type ArrayOptionsProps = {
    currentOptions: ArrayItemTypes, 
    changeOptions: Function
}

type ArrayItemProps = ArrayItemTypes & {
    id: number;
    openOptions: Function;
    openOptionsID: number | null;
    arrayContent: ArrayItemTypes[];
    changeArrayContent: Function;
}

type ArrayVisualizerProps = {
    array:ArrayItemTypes[]
}