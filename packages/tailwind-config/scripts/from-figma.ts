import type {
  GetFileNodesResponse,
  GetFileStylesResponse,
  RectangleNode,
  TextNode,
} from '@figma/rest-api-spec';

// run with node --env-file=.env scripts/index.ts
const TOKEN = process.env['FIGMA_ACCESS_TOKEN'];
const URL_BASE = 'https://api.figma.com/v1/files';

export async function getFileStyles(fileKey: string) {
  // https://www.figma.com/developers/api#get-file-styles-endpoint
  const stylesResponse = (await (
    await fetch(`${URL_BASE}/${fileKey}/styles`, {
      method: 'GET',
      headers: { 'X-FIGMA-TOKEN': TOKEN! },
    })
  ).json()) as GetFileStylesResponse;

  const styleNodeIds = stylesResponse.meta.styles.map(({ node_id }) => node_id);

  // https://www.figma.com/developers/api#get-file-nodes-endpoint
  const nodesResponse = (await (
    await fetch(`${URL_BASE}/${fileKey}/nodes?ids=${styleNodeIds.join(',')}`, {
      method: 'GET',
      headers: { 'X-FIGMA-TOKEN': TOKEN! },
    })
  ).json()) as GetFileNodesResponse;

  return fileRESTResponseToStylesJSON(stylesResponse, nodesResponse);
}

function fileRESTResponseToStylesJSON(
  stylesResponse: GetFileStylesResponse,
  nodesResponse: GetFileNodesResponse,
) {
  const result = [];
  const styles = stylesResponse.meta.styles;

  for (const style of styles.toSorted((a, b) => a.sort_position.localeCompare(b.sort_position))) {
    const node = nodesResponse.nodes[style.node_id]?.document;

    switch (style.style_type) {
      case 'TEXT': {
        const textNode = node as TextNode;
        result.push({
          type: style.style_type,
          name: style.name.replaceAll(/ *\/ */g, '/'),
          ...textNode.style,
        });
        break;
      }

      case 'EFFECT': {
        const rectangleNode = node as RectangleNode;
        result.push({
          type: style.style_type,
          name: style.name.replaceAll(/ *\/ */g, '/'),
          effects: rectangleNode.effects,
        });
        break;
      }

      case 'FILL': {
        const rectangleNode = node as RectangleNode;
        if (rectangleNode.fills[0].type === 'SOLID') {
          result.push({
            type: style.style_type,
            name: style.name.replaceAll(/ *\/ */g, '/'),
            fills: rectangleNode.fills,
          });
        }
        break;
      }
    }
  }

  return result;
}
