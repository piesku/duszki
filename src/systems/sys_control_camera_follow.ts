import {Game} from "../game.js";
import {Has} from "../world.js";

export function sys_control_camera_follow(game: Game, delta: number) {
    let camera_entity = game.Cameras[1];
    if (camera_entity === undefined) {
        // This system requires the secondary, follow camera to exist.
        return;
    }

    if (game.SelectedEntity !== null) {
        let camera_follow = game.World.Follow[camera_entity];
        camera_follow.Target = game.SelectedEntity;
        game.World.Signature[camera_entity] |= Has.Follow;

        if (game.World.Signature[game.SelectedEntity] & Has.ControlAi) {
            // Show the duszek's details panel in the sidebar.
        } else {
            game.SelectedEntity = null;
            game.World.Signature[camera_entity] &= ~Has.Follow;
        }
    }
}
