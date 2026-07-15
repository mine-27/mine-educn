import { registerFormatType, insert, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { useState, useMemo, useCallback } from '@wordpress/element';
import {
    Modal,
    TextControl,
    TabPanel,
    Button,
} from '@wordpress/components';
import FA5_ICONS from '../icon-extension/icon-data';
import './editor.scss';

const FONT = {
    solid: { family: '"Font Awesome 5 Free"', weight: 900 },
    regular: { family: '"Font Awesome 5 Free"', weight: 400 },
    brands: { family: '"Font Awesome 5 Brands"', weight: 400 },
};

function getUnicodeChar(u) {
    return String.fromCharCode(parseInt(u, 16));
}

registerFormatType('mine-educn/inline-icon', {
    title: '插入图标',
    tagName: 'span',
    className: 'medu-inline-icon',
    attributes: {
        'data-family': 'data-family',
        style: 'style',
    },
    edit({ value, onChange }) {
        const [isOpen, setIsOpen] = useState(false);
        const [search, setSearch] = useState('');

        const filtered = useMemo(() => {
            if (!search.trim()) return FA5_ICONS;
            const t = search.toLowerCase().trim();
            return FA5_ICONS.filter(
                (i) =>
                    i.name.toLowerCase().includes(t) ||
                    i.label.toLowerCase().includes(t)
            );
        }, [search]);

        const solidIcons = useMemo(
            () => filtered.filter((i) => i.family === 'solid'),
            [filtered]
        );
        const regularIcons = useMemo(
            () => filtered.filter((i) => i.family === 'regular'),
            [filtered]
        );
        const brandsIcons = useMemo(
            () => filtered.filter((i) => i.family === 'brands'),
            [filtered]
        );

        const insertIcon = useCallback(
            (iconData) => {
                const char = getUnicodeChar(iconData.unicode);
                const f = FONT[iconData.family] || FONT.solid;
                const idx = value.start;

                // 插入字符
                let v = insert(value, char);
                // 把选区移到插入的字符上
                v = { ...v, start: idx, end: idx + 1 };
                // 应用格式（含字体 + data-family 属性）
                v = toggleFormat(v, {
                    type: 'mine-educn/inline-icon',
                    attributes: {
                        'data-family': iconData.family,
                        style: `font-family:${f.family};font-weight:${f.weight};`,
                    },
                });
                // 恢复光标到字符后面
                v = { ...v, start: idx + 1, end: idx + 1 };
                onChange(v);
                setIsOpen(false);
                setSearch('');
            },
            [value, onChange]
        );

        const IconGrid = ({ icons }) => (
            <div className="medu-inline-grid">
                {icons.map((d) => (
                    <button
                        key={`${d.family}-${d.name}`}
                        className="medu-inline-grid-item"
                        onClick={() => insertIcon(d)}
                        title={d.label}
                    >
                        <span
                            className="medu-inline-grid-icon"
                            style={{
                                fontFamily: FONT[d.family]?.family,
                                fontWeight: FONT[d.family]?.weight,
                            }}
                        >
                            {getUnicodeChar(d.unicode)}
                        </span>
                    </button>
                ))}
            </div>
        );

        const tabs = [
            { name: 'solid', title: `Solid (${solidIcons.length})` },
            { name: 'regular', title: `Regular (${regularIcons.length})` },
            { name: 'brands', title: `Brands (${brandsIcons.length})` },
        ];

        return (
            <>
                <RichTextToolbarButton
                    icon="star-filled"
                    title="插入图标"
                    onClick={() => setIsOpen(true)}
                />
                {isOpen && (
                    <Modal
                        title="选择图标"
                        onRequestClose={() => {
                            setIsOpen(false);
                            setSearch('');
                        }}
                        className="medu-icon-modal"
                        size="large"
                    >
                        <div className="medu-inline-modal-content">
                            <div className="medu-inline-search">
                                <TextControl
                                    value={search}
                                    onChange={setSearch}
                                    placeholder="搜索图标名称…"
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />
                            </div>
                            <TabPanel
                                className="medu-icon-tabs"
                                activeClass="is-active"
                                tabs={tabs}
                            >
                                {(tab) => {
                                    const icons =
                                        tab.name === 'solid'
                                            ? solidIcons
                                            : tab.name === 'regular'
                                            ? regularIcons
                                            : brandsIcons;
                                    return <IconGrid icons={icons} />;
                                }}
                            </TabPanel>
                        </div>
                    </Modal>
                )}
            </>
        );
    },
});
