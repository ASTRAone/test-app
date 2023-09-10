import { FormUser } from "./pages/Form";
import { Image } from "./pages/Image";
import { Todo } from "./pages/Todo";
import { FORM_ROUTE, IMAGE_ROUTE, TODO_ROUTE } from "./utility/constants";

export const routes = [
  {
    path: FORM_ROUTE,
    Element: FormUser,
  },
  {
    path: TODO_ROUTE,
    Element: Todo,
  },
  {
    path: IMAGE_ROUTE,
    Element: Image,
  },
];
