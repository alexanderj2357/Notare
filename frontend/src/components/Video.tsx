import { VideoType } from "../types";
import React from "react";
import Box from "@material-ui/core/Box";
import { LIGHT_PINK_COLOR } from "../colorConstants";
import { NO_CATEGORY, NO_TAG } from "../stringConstants";
import { styled as materialStyled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const VideoStyledComponent = materialStyled(Box)({
  width: 200
  // backgroundColor: LIGHT_PINK_COLOR
});

interface Props {
  video: VideoType;
  categories: string[];
  onChangeCategory: (video_id: string, category: string) => void;
}

interface State {
  inputValue: string;
}

class VideoComponent extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      inputValue: this.props.video.categories
    };
  }
  render() {
    const { video, categories } = this.props;
    const category =
      video.categories === NO_TAG ? NO_CATEGORY : video.categories;
    const variant = category === NO_CATEGORY ? "secondary" : "success";

    return (
      <VideoStyledComponent
        key={video.video_id}
        m={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box display="flex" flexWrap="wrap">
          <Link to={`/VideoNotes/${video.video_id}`}>
            <Thumbnail width={200} height={130} video_id={video.video_id} />
          </Link>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {video.video_title}
        </Box>
        <Box mt={0.5}>
          <DropdownButton
            id="dropdown-button-drop-down"
            variant={variant}
            size="sm"
            title={category}
          >
            {categories.concat(NO_CATEGORY).map(c => (
              <Dropdown.Item
                key={c}
                onSelect={(e: any) =>
                  this.props.onChangeCategory(video.video_id, c)
                }
              >
                {c}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Box>
      </VideoStyledComponent>
    );
  }
}

export default VideoComponent;
