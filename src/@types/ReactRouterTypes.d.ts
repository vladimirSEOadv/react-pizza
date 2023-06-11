import { Params } from "react-router-dom";

declare function useParams<K extends string = string>(): Readonly<Params<K>>;
