import { docsMeta } from '@repo/tailwind-config';
import { Unstyled } from '@storybook/addon-docs/blocks';

function ColorPreview({ color }: { color: string }) {
  return (
    <Unstyled style={{ display: 'contents' }}>
      <div
        className="me-[0.5ch] inline-block size-[1cap] rounded-sm border border-default"
        style={{
          backgroundColor: color,
        }}
      />
    </Unstyled>
  );
}

export function TextColor() {
  return (
    <div className="my-4! overflow-x-auto">
      <table className="m-0! whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-start" scope="col">
              Figma
            </th>
            <th className="text-start" scope="col">
              クラス
            </th>
            <th className="text-start" scope="col">
              スタイル
            </th>
            <th className="text-start" scope="col">
              Hex表記
            </th>
          </tr>
        </thead>
        <tbody>
          {docsMeta.textColor.items.map((item, i) => (
            <tr key={i}>
              <th className="text-start" scope="row">
                <ColorPreview color={item.hex} />
                {item.figmaName}
              </th>
              <td>
                <p>
                  <code>{item.className}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.stylePreview}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.hex}</code>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BackgroundColor() {
  return (
    <div className="my-4! overflow-x-auto">
      <table className="m-0! whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-start" scope="col">
              Figma
            </th>
            <th className="text-start" scope="col">
              クラス
            </th>
            <th className="text-start" scope="col">
              スタイル
            </th>
            <th className="text-start" scope="col">
              Hex表記
            </th>
          </tr>
        </thead>
        <tbody>
          {docsMeta.backgroundColor.items.map((item, i) => (
            <tr key={i}>
              <th className="text-start" scope="row">
                <ColorPreview color={item.hex} />
                {item.figmaName}
              </th>
              <td>
                <p>
                  <code>{item.className}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.stylePreview}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.hex}</code>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BorderColor() {
  return (
    <div className="my-4! overflow-x-auto">
      <table className="m-0! whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-start" scope="col">
              Figma
            </th>
            <th className="text-start" scope="col">
              クラス
            </th>
            <th className="text-start" scope="col">
              スタイル
            </th>
            <th className="text-start" scope="col">
              Hex表記
            </th>
          </tr>
        </thead>
        <tbody>
          {docsMeta.borderColor.items.map((item, i) => (
            <tr key={i}>
              <th className="text-start" scope="row">
                <ColorPreview color={item.hex} />
                {item.figmaName}
              </th>
              <td>
                <p>
                  <code>{item.className}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.stylePreview}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.hex}</code>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DivideColor() {
  return (
    <div className="my-4! overflow-x-auto">
      <table className="m-0! whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-start" scope="col">
              Figma
            </th>
            <th className="text-start" scope="col">
              クラス
            </th>
            <th className="text-start" scope="col">
              スタイル
            </th>
            <th className="text-start" scope="col">
              Hex表記
            </th>
          </tr>
        </thead>
        <tbody>
          {docsMeta.divideColor.items.map((item, i) => (
            <tr key={i}>
              <th className="text-start" scope="row">
                <ColorPreview color={item.hex} />
                {item.figmaName}
              </th>
              <td>
                <p>
                  <code>{item.className}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.stylePreview}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.hex}</code>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PrimitiveColors() {
  return (
    <div className="my-4! overflow-x-auto">
      <table className="m-0! whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-start" scope="col">
              Figma
            </th>
            <th className="text-start" scope="col">
              CSS変数
            </th>
            <th className="text-start" scope="col">
              Hex表記
            </th>
          </tr>
        </thead>
        <tbody>
          {docsMeta.color.items.map((item, i) => (
            <tr key={i}>
              <th className="text-start" scope="row">
                <ColorPreview color={item.hex} />
                {item.figmaName}
              </th>
              <td>
                <p>
                  <code>{item.variableName}</code>
                </p>
              </td>
              <td>
                <p>
                  <code>{item.hex}</code>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Typography() {
  return (
    <div className="my-4! overflow-x-auto">
      <table className="m-0! whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-start" scope="col">
              Figma
            </th>
            <th className="text-start" scope="col">
              クラス
            </th>
            <th className="text-start" scope="col">
              スタイル
            </th>
          </tr>
        </thead>
        <tbody>
          {docsMeta.typography.items.map((item, i) => (
            <tr key={i}>
              <th className="text-start" scope="row">
                {item.figmaName}
              </th>
              <td>
                <p>{item.className ? <code>{item.className}</code> : <>N/A</>}</p>
              </td>
              <td>
                {item.stylePreview ? (
                  <pre>
                    <code>{item.stylePreview}</code>
                  </pre>
                ) : (
                  <>N/A</>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FontSize() {
  return (
    <div className="my-4! overflow-x-auto">
      <table className="m-0! whitespace-nowrap">
        <thead>
          <tr>
            <th className="text-start" scope="col">
              クラス
            </th>
            <th className="text-start" scope="col">
              スタイル
            </th>
          </tr>
        </thead>
        <tbody>
          {docsMeta.text.items.map((item, i) => (
            <tr key={i}>
              <th className="text-start font-normal!" scope="row">
                <p>
                  <code>{item.className}</code>
                </p>
              </th>
              <td>
                <pre>
                  <code>{item.stylePreview}</code>
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const defaultBoxShadowKeys = ['Elevation', 'Elevation Emphasis'] as const;

export const [BoxShadow, BoxShadowExtra] = [
  docsMeta.shadow.items.filter((item) =>
    defaultBoxShadowKeys.some((key) => item.figmaName.startsWith(`${key}/`)),
  ),
  docsMeta.shadow.items.filter(
    (item) => !defaultBoxShadowKeys.some((key) => item.figmaName.startsWith(`${key}/`)),
  ),
].map(
  (shadows) =>
    function BoxShadow() {
      return (
        <div className="my-4! overflow-x-auto">
          <table className="m-0! whitespace-nowrap">
            <thead>
              <tr>
                <th className="text-start" scope="col">
                  Figma
                </th>
                <th className="text-start" scope="col">
                  クラス
                </th>
                <th className="text-start" scope="col">
                  スタイル
                </th>
              </tr>
            </thead>
            <tbody>
              {shadows.map((item, i) => {
                return (
                  <tr key={i}>
                    <th className="text-start" scope="row">
                      {item.figmaName}
                    </th>
                    <td>
                      <p>
                        <code>{item.className}</code>
                      </p>
                    </td>
                    <td>
                      <p>
                        <code>{item.stylePreview}</code>
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    },
);
