import { Divider, Grid } from "@mui/material";
import toolbarIconsList from "./toolbarIconsList";
import { Box } from "mdi-material-ui";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useOnClickListener from "./useOnClickListener";
import { createPortal } from "react-dom";
import FloatingLinkEditor from "./FloatingLinkEditor";
import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
import styles from "../Toolbar.module.css";


const LexicalEditorTopBar = () => {
  const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
    useOnClickListener();

  const isIconSelected = (plugin) =>
    selectedEventTypes.includes(plugin.event) ||
    blockType.includes(plugin.event);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{
        "display": "flex",
        "padding": "1em",
        "gap": "15px"
      }}

    >
      {toolbarIconsList.map((plugin) => (
        <Grid
          key={plugin.id}
          style={{
            "cursor": "pointer",
            "height": "30px",
            "width": "30px",
            "borderRadius": "5px"
          }}
          item
        >
          {
            <plugin.Icon
              onClick={() => onClick(plugin.event)}
              color={isIconSelected(plugin) ? "secondary" : undefined}
            />
          }
        </Grid>
      ))}
      {modal}
      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
    </Grid>
  );
};

export default LexicalEditorTopBar;
