/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowObjDiff } from './diff';
import { get as atKey } from './json';

type DiffFunction = (a: any, b: any) => boolean;
type ToJsonFunction = (obj: any) => any;
type GetFunction = (obj: any, key: string) => any;
type ForEachFunction = (arr: any[], callback: (item: any) => void) => void;

const isDiffAtKey = (json1: any, json2: any, diff: DiffFunction, key: string): boolean => diff(atKey(json1, key), atKey(json2, key));

export const patch = (
  cy: any,
  json1: any,
  json2: any,
  diff: DiffFunction,
  toJson: ToJsonFunction,
  get: GetFunction,
  forEach: ForEachFunction,
): void => {
  cy.batch(() => {
    if (diff === shallowObjDiff || isDiffAtKey(json1, json2, diff, 'elements')) {
      patchElements(cy, atKey(json1, 'elements'), atKey(json2, 'elements'), toJson, get, forEach, diff);
    }

    if (isDiffAtKey(json1, json2, diff, 'stylesheet')) {
      patchStyle(cy, atKey(json1, 'stylesheet'), atKey(json2, 'stylesheet'), toJson);
    }

    [
      'zoom',
      'minZoom',
      'maxZoom',
      'zoomingEnabled',
      'userZoomingEnabled',
      'pan',
      'panningEnabled',
      'userPanningEnabled',
      'boxSelectionEnabled',
      'autoungrabify',
      'autolock',
      'autounselectify',
    ].forEach((key) => {
      if (isDiffAtKey(json1, json2, diff, key)) {
        patchJson(cy, key, atKey(json1, key), atKey(json2, key), toJson);
      }
    });
  });

  if (isDiffAtKey(json1, json2, diff, 'layout')) {
    patchLayout(cy, atKey(json1, 'layout'), atKey(json2, 'layout'), toJson);
  }
};

const patchJson = (cy: any, key: string, val1: any, val2: any, toJson: ToJsonFunction): void => {
  cy[key](toJson(val2));
};

const patchLayout = (cy: any, layout1: any, layout2: any, toJson: ToJsonFunction): void => {
  const layoutOpts = toJson(layout2);

  if (layoutOpts != null) {
    cy.layout(layoutOpts).run();
  }
};

const patchStyle = (cy: any, style1: any, style2: any, toJson: ToJsonFunction): void => {
  const style = cy.style();

  if (style == null) {
    return;
  }

  style.fromJson(toJson(style2)).update();
};

const patchElements = (
  cy: any,
  eles1: any[],
  eles2: any[],
  toJson: ToJsonFunction,
  get: GetFunction,
  forEach: ForEachFunction,
  diff: DiffFunction,
): void => {
  const toAdd: any[] = [];
  const toRm = cy.collection();
  const toPatch: { ele1: any; ele2: any }[] = [];
  const eles1Map: { [key: string]: any } = {};
  const eles2Map: { [key: string]: any } = {};
  const eles1HasId = (id: string) => eles1Map[id] != null;
  const eles2HasId = (id: string) => eles2Map[id] != null;
  const getEle1 = (id: string) => eles1Map[id];
  const getId = (ele: any) => get(get(ele, 'data'), 'id');

  forEach(eles2, (ele2) => {
    const id = getId(ele2);
    eles2Map[id] = ele2;
  });

  if (eles1 != null) {
    forEach(eles1, (ele1) => {
      const id = getId(ele1);
      eles1Map[id] = ele1;

      if (!eles2HasId(id)) {
        toRm.merge(cy.getElementById(id));
      }
    });
  }

  forEach(eles2, (ele2) => {
    const id = getId(ele2);
    const ele1 = getEle1(id);

    if (eles1HasId(id)) {
      toPatch.push({ ele1, ele2 });
    } else {
      toAdd.push(toJson(ele2));
    }
  });

  if (toRm.length > 0) {
    cy.remove(toRm);
  }

  if (toAdd.length > 0) {
    cy.add(toAdd);
  }

  toPatch.forEach(({ ele1, ele2 }) => patchElement(cy, ele1, ele2, toJson, get, diff));
};

const patchElement = (cy: any, ele1: any, ele2: any, toJson: ToJsonFunction, get: GetFunction, diff: DiffFunction): void => {
  const id = get(get(ele2, 'data'), 'id');
  const cyEle = cy.getElementById(id);
  const patch: { [key: string]: any } = {};
  const jsonKeys = ['data', 'position', 'selected', 'selectable', 'locked', 'grabbable', 'classes'];

  jsonKeys.forEach((key) => {
    const data2 = get(ele2, key);

    if (diff(data2, get(ele1, key))) {
      patch[key] = toJson(data2);
    }
  });

  const scratch2 = get(ele2, 'scratch');
  if (diff(scratch2, get(ele1, 'scratch'))) {
    cyEle.scratch(toJson(scratch2));
  }

  if (Object.keys(patch).length > 0) {
    cyEle.json(patch);
  }
};
