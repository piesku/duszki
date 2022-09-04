import {camera2d, CameraTarget} from "../components/com_camera2d.js";
import {disable} from "../components/com_disable.js";
import {follow} from "../components/com_follow.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {spatial_node2d} from "../components/com_spatial_node2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function blueprint_camera_follow(game: Game) {
    return [
        spatial_node2d(),
        local_transform2d(),
        camera2d(CameraTarget.Follow, [2, 2]),
        follow(-1),
        disable(Has.Follow),
    ];
}
