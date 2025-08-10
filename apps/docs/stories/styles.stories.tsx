import { docsMeta } from '@repo/tailwind-config';
import { twMerge } from '@repo/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { chunk } from 'es-toolkit';
import { Fragment } from 'react';

const meta = {
  title: 'Styles',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Typography = {
  render: () => (
    <dl className="space-y-[1.5lh]">
      {docsMeta.typography.items.map((item, i) =>
        item.className ? (
          <div key={i}>
            <dt>{item.figmaName}</dt>
            <dd>
              <p className={twMerge('overflow-clip whitespace-nowrap', item.className)}>
                データによって人の価値を最大化する
              </p>
            </dd>
          </div>
        ) : null,
      )}
    </dl>
  ),
} satisfies Story;

export const FontSize = {
  render: () => (
    <dl className="space-y-[1.5lh]">
      {docsMeta.text.items.map((item, i) => (
        <div key={i}>
          <dt>
            <code>{item.className}</code>
          </dt>
          <dd>
            {/* text-3xs text-2xs text-xs text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl */}
            <p className={twMerge('overflow-clip whitespace-nowrap', item.className)}>
              データによって人の価値を最大化する
            </p>
          </dd>
        </div>
      ))}
    </dl>
  ),
} satisfies Story;

export const BoxShadow = {
  render: () => {
    const elevationKeys = docsMeta.shadow.items
      .filter((item) => item.type === 'Elevation')
      .map((item) => item.level);

    return (
      <table className="whitespace-nowrap">
        <thead>
          <tr>
            <td></td>
            {elevationKeys.map((name) => (
              <th key={name} className="pb-6">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunk(docsMeta.shadow.items, elevationKeys.length).map((items, i) => (
            <tr key={i}>
              {items.map((item, i) => (
                <Fragment key={i}>
                  {i === 0 && <th className="pe-6 text-start">{item.type}</th>}
                  <td className="p-6">
                    <div className="size-6 rounded-sm" title={item.figmaName} style={item.style} />
                  </td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
} satisfies Story;
