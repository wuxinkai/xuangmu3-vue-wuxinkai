import {INSTANCE} from "./PUnits";

INSTANCE.setLabelPos = function(object) {
  this.scene3D.setLabelPos(document.getElementsByClassName("labelItem")[0], object.point.clone());
};

INSTANCE.changeMeshMaterial = function(object, options) {
  this.scene3D.materialController.restorePreLevelObject();
  this.scene3D.changeMeshMaterial(object.object, options);
};

