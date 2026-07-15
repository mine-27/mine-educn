import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useMemo, useCallback, useEffect } from '@wordpress/element';
import {
    Modal,
    Button,
    TextControl,
    ColorPicker,
    __experimentalUnitControl as UnitControl,
    TabPanel,
} from '@wordpress/components';
import FA5_ICONS from './icon-data';
import './editor.scss';

const FONT_FAMILIES = {
    solid: '"Font Awesome 5 Free"',
    regular: '"Font Awesome 5 Free"',
    brands: '"Font Awesome 5 Brands"',
};
const FONT_WEIGHTS = { solid: 900, regular: 400, brands: 400 };

function getUnicodeChar(u) {
    return String.fromCharCode(parseInt(u, 16));
}

// ---- 0. 通过 BlockListBlock filter 注入 CSS 变量到区块 wrapper ----
addFilter(
    'editor.BlockListBlock',
    'mine-educn/icon-css-vars',
    createHigherOrderComponent((BlockListBlock) => {
        return (props) => {
            if (props.name !== 'core/paragraph')
                return <BlockListBlock {...props} />;
            if (
                !props.attributes.className?.includes('is-style-medu-icon')
            )
                return <BlockListBlock {...props} />;

            const {
                meduIconColor = '#2080f7',
                meduIconBgColor = '',
                meduIconSize = '1rem',
                meduIconMargin = '0.5rem',
            } = props.attributes;

            const wrapperProps = {
                ...props.wrapperProps,
                style: {
                    ...props.wrapperProps?.style,
                    '--medu-icon-color': meduIconColor,
                    '--medu-icon-bg': meduIconBgColor || 'transparent',
                    '--medu-icon-size': meduIconSize,
                    '--medu-icon-margin': meduIconMargin,
                },
            };

            return (
                <BlockListBlock {...props} wrapperProps={wrapperProps} />
            );
        };
    }, 'IconCssVars')
);

// ---- 1. 给段落区块添加自定义属性 ----
addFilter(
    'blocks.registerBlockType',
    'mine-educn/icon-attrs',
    (settings, name) => {
        if (name !== 'core/paragraph') return settings;
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                meduIcon: { type: 'string', default: 'check' },
                meduIconUnicode: { type: 'string', default: 'f00c' },
                meduIconFamily: { type: 'string', default: 'solid' },
                meduIconColor: { type: 'string', default: '#2080f7' },
                meduIconBgColor: { type: 'string', default: '' },
                meduIconSize: { type: 'string', default: '1rem' },
                meduIconMargin: { type: 'string', default: '0.5rem' },
            },
        };
    }
);

// ---- 2. 编辑器可视化 + 侧边栏面板 ----
const IconPanel = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/paragraph') return <BlockEdit {...props} />;

        // 样式已切回默认 → 清理残留的 fa 类
        if (!props.attributes.className?.includes('is-style-medu-icon')) {
            const cls = props.attributes.className || '';
            if (/\b(fas|far|fab)\b/.test(cls)) {
                const cleaned = cls
                    .replace(/\b(fas|far|fab)\b/g, '')
                    .replace(/\bfa-[a-z0-9-]+\b/gi, '')
                    .replace(/\s{2,}/g, ' ')
                    .trim();
                props.setAttributes({ className: cleaned || undefined });
            }
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;

        // 重新切换到"带图标"样式时，把上次选的图标加回 className
        useEffect(() => {
            const { meduIcon: ico, meduIconFamily: fam } = attributes;
            if (!ico) return;
            const prefix = fam === 'brands' ? 'fab' : 'fas';
            const expect = `fa-${ico}`;
            const cls = attributes.className || '';
            if (cls.includes(expect)) return; // 已经有了，不用加
            const cleaned = cls
                .replace(/\b(fas|far|fab)\b/g, '')
                .replace(/\bfa-[a-z0-9-]+\b/gi, '')
                .replace(/\s{2,}/g, ' ')
                .trim();
            const newCls = `${cleaned} ${prefix} ${expect}`
                .replace(/\s{2,}/g, ' ')
                .trim();
            setAttributes({ className: newCls });
        }, []); // 仅在组件挂载时执行（切换回样式时触发）
        const {
            meduIcon = 'check',
            meduIconUnicode = 'f00c',
            meduIconFamily = 'solid',
            meduIconColor = '#2080f7',
            meduIconBgColor = '',
            meduIconSize = '1rem',
            meduIconMargin = '0.5rem',
        } = attributes;

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [searchTerm, setSearchTerm] = useState('');
        const [colorVisible, setColorVisible] = useState(false);
        const [bgVisible, setBgVisible] = useState(false);

        const currentIcon = useMemo(
            () =>
                FA5_ICONS.find(
                    (i) => i.name === meduIcon && i.family === meduIconFamily
                ) || null,
            [meduIcon, meduIconFamily]
        );

        const filtered = useMemo(() => {
            if (!searchTerm.trim()) return FA5_ICONS;
            const t = searchTerm.toLowerCase().trim();
            return FA5_ICONS.filter(
                (i) =>
                    i.name.toLowerCase().includes(t) ||
                    i.label.toLowerCase().includes(t)
            );
        }, [searchTerm]);

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

        // 选择图标时，将 fa fa-xxx 写入 className（利用已有 FontAwesome CSS）
        const selectIcon = useCallback(
            (iconData) => {
                const faPrefix =
                    iconData.family === 'brands' ? 'fab' : 'fas';
                const faClass = `fa-${iconData.name}`;
                const currentClass = attributes.className || '';

                // 移除旧的 fa 前缀和 fa-xxx 类
                const cleanClass = currentClass
                    .replace(/\b(fas|far|fab)\b/g, '')
                    .replace(/\bfa-[a-z0-9-]+\b/gi, '')
                    .replace(/\s{2,}/g, ' ')
                    .trim();

                const newClass = [
                    cleanClass,
                    faPrefix,
                    faClass,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .replace(/\s{2,}/g, ' ')
                    .trim();

                setAttributes({
                    meduIcon: iconData.name,
                    meduIconUnicode: iconData.unicode,
                    meduIconFamily: iconData.family,
                    className: newClass,
                });

                setIsModalOpen(false);
                setSearchTerm('');
            },
            [attributes.className, setAttributes]
        );

        const IconGrid = ({ icons }) => (
            <div className="medu-icon-grid">
                {icons.map((d) => {
                    const sel =
                        d.name === meduIcon && d.family === meduIconFamily;
                    return (
                        <button
                            key={`${d.family}-${d.name}`}
                            className={`medu-icon-grid-item${sel ? ' is-selected' : ''}`}
                            onClick={() => selectIcon(d)}
                            title={d.label}
                        >
                            <span
                                className="medu-icon-grid-icon"
                                style={{
                                    fontFamily: FONT_FAMILIES[d.family],
                                    fontWeight: FONT_WEIGHTS[d.family],
                                }}
                            >
                                {getUnicodeChar(d.unicode)}
                            </span>
                            <span className="medu-icon-grid-label">
                                {d.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        );

        const tabs = [
            { name: 'solid', title: `Solid (${solidIcons.length})` },
            { name: 'regular', title: `Regular (${regularIcons.length})` },
            { name: 'brands', title: `Brands (${brandsIcons.length})` },
        ];

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <div className="medu-icon-panel">
                    <div className="medu-icon-inspector">
                        <div className="medu-icon-current">
                            <div
                                className="medu-icon-current-preview"
                                style={{
                                    fontFamily: FONT_FAMILIES[meduIconFamily],
                                    fontWeight: FONT_WEIGHTS[meduIconFamily],
                                    color: meduIconColor,
                                    backgroundColor:
                                        meduIconBgColor || 'transparent',
                                    fontSize: meduIconSize,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: meduIconBgColor
                                        ? '6px'
                                        : '0',
                                    marginRight: '8px',
                                }}
                            >
                                {getUnicodeChar(meduIconUnicode)}
                            </div>
                            <div className="medu-icon-current-info">
                                <strong>{currentIcon?.label || 'check'}</strong>
                                <span className="medu-icon-current-name">
                                    fa-{currentIcon?.name || 'check'}
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => setIsModalOpen(true)}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            选择图标
                        </Button>
                    </div>

                    <div className="medu-icon-settings">
                        <h3>图标颜色</h3>
                        <div className="medu-icon-color-row">
                            <button
                                className="medu-icon-color-swatch"
                                style={{ backgroundColor: meduIconColor }}
                                onClick={() => setColorVisible(!colorVisible)}
                            />
                            <span className="medu-icon-color-label">
                                {meduIconColor}
                            </span>
                            {meduIconColor !== '#2080f7' && (
                                <Button
                                    variant="link"
                                    isDestructive
                                    onClick={() =>
                                        setAttributes({ meduIconColor: '#2080f7' })
                                    }
                                    style={{ marginLeft: 'auto', fontSize: '11px' }}
                                >
                                    重置
                                </Button>
                            )}
                        </div>
                        {colorVisible && (
                            <ColorPicker
                                color={meduIconColor}
                                onChange={(c) =>
                                    setAttributes({ meduIconColor: c })
                                }
                                enableAlpha
                            />
                        )}

                        <h3>背景颜色</h3>
                        <div className="medu-icon-color-row">
                            <button
                                className="medu-icon-color-swatch"
                                style={{
                                    backgroundColor:
                                        meduIconBgColor || 'transparent',
                                    border: meduIconBgColor
                                        ? 'none'
                                        : '2px dashed #ccc',
                                }}
                                onClick={() => setBgVisible(!bgVisible)}
                            />
                            <span className="medu-icon-color-label">
                                {meduIconBgColor || '无背景'}
                            </span>
                            {meduIconBgColor && (
                                <Button
                                    variant="link"
                                    isDestructive
                                    onClick={() =>
                                        setAttributes({ meduIconBgColor: '' })
                                    }
                                    style={{ marginLeft: 'auto', fontSize: '11px' }}
                                >
                                    清除
                                </Button>
                            )}
                        </div>
                        {bgVisible && (
                            <ColorPicker
                                color={meduIconBgColor || '#fff'}
                                onChange={(c) =>
                                    setAttributes({ meduIconBgColor: c })
                                }
                                enableAlpha
                            />
                        )}
                    </div>

                    <UnitControl
                        label="图标大小"
                        value={meduIconSize}
                        onChange={(v) =>
                            setAttributes({ meduIconSize: v || '1rem' })
                        }
                        units={[
                            { value: 'px', label: 'px' },
                            { value: 'rem', label: 'rem' },
                            { value: 'em', label: 'em' },
                        ]}
                    />
                    <UnitControl
                        label="图标间距"
                        value={meduIconMargin}
                        onChange={(v) =>
                            setAttributes({ meduIconMargin: v || '0.5rem' })
                        }
                        units={[
                            { value: 'px', label: 'px' },
                            { value: 'rem', label: 'rem' },
                            { value: 'em', label: 'em' },
                        ]}
                    />
                    </div>
                </InspectorControls>

                {isModalOpen && (
                    <Modal
                        title="选择图标"
                        onRequestClose={() => {
                            setIsModalOpen(false);
                            setSearchTerm('');
                        }}
                        className="medu-icon-modal"
                        size="large"
                    >
                        <div className="medu-icon-modal-content">
                            <div className="medu-icon-search">
                                <TextControl
                                    value={searchTerm}
                                    onChange={setSearchTerm}
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
    };
}, 'IconPanel');

addFilter('editor.BlockEdit', 'mine-educn/icon-panel', IconPanel);
