// Menu/contract line items are copies of a base MenuItem, so a description typed on the copy
// never reaches the base item (deliberate: lets a menu tweak wording for layout/style).
// The one exception: when the base item has NO description yet, offer to adopt this one
// as the default. A base item that already has a description is never prompted or touched.
function tmMenuItemDescSync($dataSource, $mdDialog, $q) {
    const declined = {};
    let prompting = false;

    // lines: array of {name, description, <idKey>}; idKey: 'menuItemId' (menus) or 'baseId' (contracts)
    this.offerToSave = (lines, idKey) => {
        if (prompting) { return $q.resolve(); }
        const candidates = {};
        (lines || []).forEach((line) => {
            const id = line[idKey];
            const desc = line.description && line.description.trim();
            if (id && desc && !declined[id] && !candidates[id]) {
                candidates[id] = desc;
            }
        });
        const ids = Object.keys(candidates);
        if (!ids.length) { return $q.resolve(); }

        const model = $dataSource.load('MenuItem');
        return $q.all(ids.map((id) => model.getOne(id, true).catch(() => null))).then((bases) => {
            const gaps = bases.filter((b) => b && b._id && !(b.description && b.description.trim()));
            // oldest-first iteration; ask once per base item that is missing a description
            return gaps.reduce((chain, base) => chain.then(() => {
                prompting = true;
                const confirm = $mdDialog.confirm()
                    .title('Save as default description?')
                    .textContent(`"${base.name}" has no description yet. Save this one as its default?\n\n${candidates[base._id]}`)
                    .ok('Yes, save it')
                    .cancel('No, just this menu');
                return $mdDialog.show(confirm).then(() => {
                    base.description = candidates[base._id];
                    return model.update(base);
                }, () => {
                    declined[base._id] = true;
                }).finally(() => { prompting = false; });
            }), $q.resolve());
        });
    };
}

tmMenuItemDescSync.$inject = ['$dataSource', '$mdDialog', '$q'];

export default tmMenuItemDescSync;
