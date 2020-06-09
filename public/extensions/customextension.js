class ColorByNameExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._group = null;
        this._button = null;
    }

    load() {
        console.log('ColorByNameExtension has been loaded');
        return true;
    }

    unload() {
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('ColorByNameExtension has been unloaded');
        return true;
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        this._group = this.viewer.toolbar.getControl('CustomFuncToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('CustomFuncToolbar');
            this.viewer.toolbar.addControl(this._group);
        }

        // Add a new button to the toolbar group
        this._button = new Autodesk.Viewing.UI.Button('ColorByNameExtension');
        this._button.onClick = (ev) => {
            console.log(this.viewer.model);
            var it = this.viewer.model.getInstanceTree();
            console.log(it);
            this.viewer.impl.setSelectionColor(new THREE.Color(1,0,0));
            this.viewer.select(40, this.viewer.model);

            // TODO : implementer la fonction de call de l'api forge (get :urn/metadata/:guid)

        };
        this._button.setToolTip('Color By Name Extension');
        this._button.addClass('colorByNameExtension');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('ColorByNameExtension', ColorByNameExtension);