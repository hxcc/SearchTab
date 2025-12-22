// 搜索引擎配置
const SEARCH_ENGINES = {
    google: {
        name: '谷歌搜索',
        url: 'https://www.google.com/search?q={query}',
        icon: 'fab fa-google',
        color: '#4285f4'
    },
    baidu: {
        name: '百度搜索',
        url: 'https://www.baidu.com/s?wd={query}',
        icon: 'fab fa-baidu',
        color: '#2932e1'
    },
    bing: {
        name: '必应搜索',
        url: 'https://www.bing.com/search?q={query}',
        icon: 'fab fa-microsoft',
        color: '#0078d4'
    }
};

// 当前选中的搜索引擎
let currentEngine = 'baidu';
let customSearches = [];

// 最大行数配置
const MAX_ROWS = 10;
let customRows = []; // 存储所有自定义行

// 常用图标库
const ICON_LIBRARY = {
    // 搜索相关图标
    search: [
        { class: 'fas fa-search', name: '搜索' },
        { class: 'fas fa-search-plus', name: '放大搜索' },
        { class: 'fas fa-search-minus', name: '缩小搜索' },
        { class: 'fas fa-binoculars', name: '双筒望远镜' },
        { class: 'fas fa-filter', name: '筛选' },
        { class: 'fas fa-sort', name: '排序' },
        { class: 'fas fa-sort-alpha-down', name: '字母排序' },
        { class: 'fas fa-sort-amount-down', name: '数量排序' },
        { class: 'fas fa-cog', name: '设置' },
        { class: 'fas fa-sliders-h', name: '滑块' }
    ],
    
    // 社交和品牌图标
    social: [
        { class: 'fab fa-google', name: '谷歌' },
        { class: 'fab fa-baidu', name: '百度' },
        { class: 'fab fa-microsoft', name: '微软' },
        { class: 'fab fa-github', name: 'GitHub' },
        { class: 'fab fa-twitter', name: '推特' },
        { class: 'fab fa-facebook', name: 'Facebook' },
        { class: 'fab fa-youtube', name: 'YouTube' },
        { class: 'fab fa-instagram', name: 'Instagram' },
        { class: 'fab fa-linkedin', name: 'LinkedIn' },
        { class: 'fab fa-reddit', name: 'Reddit' },
        { class: 'fab fa-weibo', name: '微博' },
        { class: 'fab fa-weixin', name: '微信' },
        { class: 'fab fa-qq', name: 'QQ' },
        { class: 'fab fa-wikipedia-w', name: '维基百科' },
        { class: 'fab fa-stack-overflow', name: 'Stack Overflow' }
    ],
    
    // 品牌图标
    brand: [
        { class: 'fab fa-apple', name: '苹果' },
        { class: 'fab fa-android', name: '安卓' },
        { class: 'fab fa-windows', name: 'Windows' },
        { class: 'fab fa-linux', name: 'Linux' },
        { class: 'fab fa-chrome', name: 'Chrome' },
        { class: 'fab fa-firefox', name: 'Firefox' },
        { class: 'fab fa-edge', name: 'Edge' },
        { class: 'fab fa-safari', name: 'Safari' },
        { class: 'fab fa-amazon', name: '亚马逊' },
        { class: 'fab fa-ebay', name: 'eBay' },
        { class: 'fab fa-paypal', name: 'PayPal' },
        { class: 'fab fa-visa', name: 'Visa' },
        { class: 'fab fa-mastercard', name: 'MasterCard' },
        { class: 'fab fa-bitcoin', name: '比特币' }
    ],
    
    // 工具图标
    tools: [
        { class: 'fas fa-tools', name: '工具' },
        { class: 'fas fa-wrench', name: '扳手' },
        { class: 'fas fa-screwdriver', name: '螺丝刀' },
        { class: 'fas fa-hammer', name: '锤子' },
        { class: 'fas fa-cogs', name: '齿轮组' },
        { class: 'fas fa-cube', name: '立方体' },
        { class: 'fas fa-box', name: '盒子' },
        { class: 'fas fa-archive', name: '存档' },
        { class: 'fas fa-database', name: '数据库' },
        { class: 'fas fa-server', name: '服务器' },
        { class: 'fas fa-cloud', name: '云' },
        { class: 'fas fa-download', name: '下载' },
        { class: 'fas fa-upload', name: '上传' },
        { class: 'fas fa-sync', name: '同步' },
        { class: 'fas fa-redo', name: '重做' }
    ],
    
    // 媒体和文件图标
    media: [
        { class: 'fas fa-image', name: '图片' },
        { class: 'fas fa-photo-video', name: '照片视频' },
        { class: 'fas fa-film', name: '电影' },
        { class: 'fas fa-music', name: '音乐' },
        { class: 'fas fa-book', name: '书籍' },
        { class: 'fas fa-newspaper', name: '报纸' },
        { class: 'fas fa-file', name: '文件' },
        { class: 'fas fa-file-alt', name: '文本文件' },
        { class: 'fas fa-file-pdf', name: 'PDF文件' },
        { class: 'fas fa-file-word', name: 'Word文件' },
        { class: 'fas fa-file-excel', name: 'Excel文件' },
        { class: 'fas fa-file-powerpoint', name: 'PPT文件' },
        { class: 'fas fa-folder', name: '文件夹' },
        { class: 'fas fa-folder-open', name: '打开文件夹' },
        { class: 'fas fa-save', name: '保存' }
    ],
    
    // 其他常用图标
    other: [
        { class: 'fas fa-home', name: '首页' },
        { class: 'fas fa-globe', name: '地球' },
        { class: 'fas fa-map-marker-alt', name: '位置标记' },
        { class: 'fas fa-envelope', name: '信封' },
        { class: 'fas fa-phone', name: '电话' },
        { class: 'fas fa-calendar', name: '日历' },
        { class: 'fas fa-clock', name: '时钟' },
        { class: 'fas fa-user', name: '用户' },
        { class: 'fas fa-users', name: '用户组' },
        { class: 'fas fa-key', name: '钥匙' },
        { class: 'fas fa-lock', name: '锁' },
        { class: 'fas fa-unlock', name: '解锁' },
        { class: 'fas fa-shield-alt', name: '盾牌' },
        { class: 'fas fa-bell', name: '铃铛' },
        { class: 'fas fa-star', name: '星星' }
    ]
};

// 所有图标（用于"全部"分类）
const ALL_ICONS = Object.values(ICON_LIBRARY).flat();

// 获取默认壁纸URL
function getDefaultWallpaperURL() {
    // 使用插件内置的默认壁纸
    return chrome.runtime.getURL('default-wallpaper.jpg');
}

// DOM元素
const backgroundImage = document.getElementById('backgroundImage');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchHint = document.getElementById('searchHint');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const currentDate = document.getElementById('currentDate');
const currentTime = document.getElementById('currentTime');
const changeWallpaperBtn = document.getElementById('changeWallpaperBtn');
const wallpaperUpload = document.getElementById('wallpaperUpload');
const wallpaperPresets = document.querySelectorAll('.wallpaper-preset');
const resetWallpaperBtn = document.getElementById('resetWallpaperBtn');
const clearDataBtn = document.getElementById('clearDataBtn');
const showTimeDate = document.getElementById('showTimeDate');
const quickButtons = document.getElementById('quickButtons');

// 自定义搜索相关的DOM元素
const customSearchName = document.getElementById('customSearchName');
const customSearchUrl = document.getElementById('customSearchUrl');
const customSearchIcon = document.getElementById('customSearchIcon');
const addCustomSearchBtn = document.getElementById('addCustomSearchBtn');
const customSearchList = document.getElementById('customSearchList');
const clearCustomSearchesBtn = document.getElementById('clearCustomSearchesBtn');

// 初始化自定义行
function initCustomRows() {
    // 第1行是固定的快捷按钮行
    const existingRows = [
        { id: 1, element: quickButtons, align: 'center' }
    ];
    
    // 清除现有的自定义行（但保留第1行）
    customRows.forEach(row => {
        if (row.id > 1 && row.element && row.element.parentNode) {
            row.element.remove();
        }
    });
    
    customRows = existingRows;
    
    // 加载保存的行数配置
    chrome.storage.sync.get(['customRows'], (result) => {
        const savedRows = result.customRows || [];
        
        // 按行号排序后创建
        savedRows.sort((a, b) => a.id - b.id).forEach(rowConfig => {
            if (rowConfig.id > 1) {
                createCustomRow(rowConfig.id, rowConfig.align || 'center');
            }
        });
    });
}

// 创建自定义行（修复版，确保行按顺序插入）
function createCustomRow(rowId, align = 'center') {
    // 检查是否已存在该行
    const existingRow = customRows.find(row => row.id === rowId);
    if (existingRow) return existingRow;
    
    // 创建新行
    const rowDiv = document.createElement('div');
    rowDiv.className = `custom-buttons-row ${align}-align`;
    rowDiv.id = `customRow${rowId}`;
    
    // 找到插入位置：按照行号顺序插入
    let insertBeforeElement = null;
    
    // 查找第一个行号大于当前行号的行
    for (let i = 0; i < customRows.length; i++) {
        if (customRows[i].id > rowId) {
            insertBeforeElement = customRows[i].element;
            break;
        }
    }
    
    if (insertBeforeElement) {
        // 在找到的元素之前插入
        insertBeforeElement.parentNode.insertBefore(rowDiv, insertBeforeElement);
    } else {
        // 如果没有找到更大的行号，插入到最后
        // 找到最后一个元素
        const lastRow = customRows[customRows.length - 1];
        if (lastRow) {
            lastRow.element.insertAdjacentElement('afterend', rowDiv);
        } else {
            // 如果没有自定义行，插入到第一行之后
            quickButtons.insertAdjacentElement('afterend', rowDiv);
        }
    }
    
    const rowObj = { id: rowId, element: rowDiv, align };
    
    // 将新行添加到customRows数组，并保持排序
    customRows.push(rowObj);
    customRows.sort((a, b) => a.id - b.id);
    
    // 保存行配置
    saveRowConfig();
    
    return rowObj;
}

// 更新行选择器 - 修复版
function updateRowSelection() {
    const rowSelect = document.getElementById('customSearchRow');
    const existingRowsInfo = document.getElementById('existingRowsInfo');
    
    if (!rowSelect) return;
    
    // 保存当前选中的值
    const currentValue = rowSelect.value;
    
    // 清空现有选项
    rowSelect.innerHTML = '';
    
    // 获取所有有按钮的行ID（包括第1行和自定义行）
    const rowsWithButtons = new Set();
    
    // 第1行总是有按钮（谷歌、百度、必应）
    rowsWithButtons.add(1);
    
    // 添加所有自定义搜索引擎所在的行
    customSearches.forEach(engine => {
        rowsWithButtons.add(engine.row);
    });
    
    // 总是显示1-10行
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        
        const hasButtons = rowsWithButtons.has(i);
        const rowExists = customRows.some(row => row.id === i);
        
        option.textContent = i === 1 ? `第${i}行（固定按钮行）` : 
                            (hasButtons ? `第${i}行（有按钮）` : `第${i}行`);
        
        // 如果行有按钮，用不同颜色标记
        if (hasButtons) {
            option.style.color = '#4285f4';
        }
        
        rowSelect.appendChild(option);
    }
    
    // 恢复之前选中的值，如果没有则选择第2行
    if (currentValue && rowSelect.querySelector(`option[value="${currentValue}"]`)) {
        rowSelect.value = currentValue;
    } else {
        rowSelect.value = '2';
    }
    
    // 更新行信息显示
    if (existingRowsInfo) {
        const sortedRows = Array.from(rowsWithButtons).sort((a, b) => a - b);
        if (sortedRows.length > 0) {
            const rowInfo = sortedRows.map(row => `第${row}行`).join('、');
            existingRowsInfo.textContent = `有按钮的行：${rowInfo}`;
        } else {
            existingRowsInfo.textContent = '暂无自定义按钮，将自动创建新行';
        }
    }
}

// 保存行配置
function saveRowConfig() {
    const rowsToSave = customRows.filter(row => row.id > 1);
    chrome.storage.sync.set({ customRows: rowsToSave });
}

// 初始化图标选择器
function initIconSelector() {
    const iconInput = document.getElementById('customSearchIcon');
    const iconPreview = document.getElementById('iconPreview');
    const iconSelector = document.getElementById('iconSelector');
    const closeIconSelector = document.getElementById('closeIconSelector');
    const iconGrid = document.getElementById('iconGrid');
    const iconCategories = document.querySelectorAll('.icon-category-btn');
    
    if (!iconInput) return;
    
    // 点击图标输入框打开选择器
    iconInput.addEventListener('click', () => {
        iconSelector.style.display = 'block';
        // 如果图标网格为空，初始化图标
        if (iconGrid.children.length === 0) {
            renderIconGrid('all');
        }
    });
    
    // 关闭图标选择器
    closeIconSelector.addEventListener('click', () => {
        iconSelector.style.display = 'none';
    });
    
    // 点击外部关闭图标选择器
    document.addEventListener('click', (e) => {
        if (iconSelector && !iconSelector.contains(e.target) && e.target !== iconInput) {
            iconSelector.style.display = 'none';
        }
    });
    
    // 分类切换
    iconCategories.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有active类
            iconCategories.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            btn.classList.add('active');
            // 渲染对应分类的图标
            const category = btn.dataset.category;
            renderIconGrid(category);
        });
    });
    
    // 渲染图标网格
    function renderIconGrid(category) {
        iconGrid.innerHTML = '';
        
        let iconsToShow = [];
        
        if (category === 'all') {
            iconsToShow = ALL_ICONS;
        } else {
            iconsToShow = ICON_LIBRARY[category] || [];
        }
        
        iconsToShow.forEach(icon => {
            const iconElement = document.createElement('div');
            iconElement.className = 'icon-item';
            iconElement.title = icon.name;
            iconElement.innerHTML = `<i class="${icon.class}"></i>`;
            
            iconElement.addEventListener('click', () => {
                iconInput.value = icon.class;
                iconPreview.className = icon.class;
                iconSelector.style.display = 'none';
            });
            
            iconGrid.appendChild(iconElement);
        });
    }
    
    // 手动输入图标时的预览更新
    iconInput.addEventListener('input', () => {
        const iconClass = iconInput.value.trim();
        if (iconClass) {
            try {
                iconPreview.className = iconClass;
            } catch (e) {
                // 如果图标类名无效，恢复默认
                iconPreview.className = 'fas fa-search';
            }
        } else {
            iconPreview.className = 'fas fa-search';
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    updateDateTime();
    loadSettings();
    loadCustomSearches(); // 这个函数会调用initCustomRows
    
    // 更新日期时间每秒钟
    setInterval(updateDateTime, 1000);
    
    // 初始化图标选择器
    initIconSelector();
});

// 初始化事件监听器
function initEventListeners() {
    // 搜索相关
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 快捷按钮 - 使用对应的搜索引擎搜索
    document.getElementById('quickGoogle').addEventListener('click', () => {
        searchWithEngine('google');
    });
    
    document.getElementById('quickBaidu').addEventListener('click', () => {
        searchWithEngine('baidu');
    });
    
    document.getElementById('quickBing').addEventListener('click', () => {
        searchWithEngine('bing');
    });
    
    // 设置面板
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.add('open');
    });
    
    closeSettingsBtn.addEventListener('click', () => {
        settingsPanel.classList.remove('open');
    });
    
    // 壁纸控制
    changeWallpaperBtn.addEventListener('click', () => {
        wallpaperUpload.click();
    });
    
    wallpaperUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                backgroundImage.style.backgroundImage = `url(${e.target.result})`;
                chrome.storage.sync.set({ customWallpaper: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    });
    
    wallpaperPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            const imgUrl = preset.dataset.img;
            backgroundImage.style.backgroundImage = `url(${imgUrl})`;
            chrome.storage.sync.set({ wallpaper: imgUrl, customWallpaper: '' });
        });
    });
    
    // 重置壁纸按钮 - 恢复为内置默认壁纸
    resetWallpaperBtn.addEventListener('click', () => {
        const defaultWallpaperURL = getDefaultWallpaperURL();
        backgroundImage.style.backgroundImage = `url(${defaultWallpaperURL})`;
        chrome.storage.sync.set({ wallpaper: '', customWallpaper: '' });
    });
    
    // 默认搜索引擎设置
    document.querySelectorAll('input[name="defaultEngine"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            chrome.storage.sync.set({ defaultEngine: e.target.value });
            currentEngine = e.target.value;
        });
    });
    
    // 显示选项 - 只保留显示时间和日期
    showTimeDate.addEventListener('change', (e) => {
        chrome.storage.sync.set({ showTimeDate: e.target.checked });
        updateDateTimeDisplay();
    });
    
    // 数据管理
    clearDataBtn.addEventListener('click', () => {
        if (confirm('确定要清除所有设置吗？')) {
            chrome.storage.sync.clear(() => {
                alert('设置已清除');
                // 重置为默认壁纸
                const defaultWallpaperURL = getDefaultWallpaperURL();
                backgroundImage.style.backgroundImage = `url(${defaultWallpaperURL})`;
                location.reload();
            });
        }
    });
    
    // 自定义搜索引擎
    addCustomSearchBtn.addEventListener('click', addCustomSearch);
    clearCustomSearchesBtn.addEventListener('click', clearCustomSearches);
    
    // 书签和历史记录按钮
    document.getElementById('bookmarksBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: 'chrome://bookmarks/' });
    });
    
    document.getElementById('historyBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: 'chrome://history/' });
    });
}

// 使用指定搜索引擎搜索
function searchWithEngine(engineId) {
    currentEngine = engineId;
    performSearch();
}

// 执行搜索
function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        searchInput.focus();
        return;
    }
    
    let engine = SEARCH_ENGINES[currentEngine];
    
    // 检查是否是自定义搜索引擎
    if (!engine) {
        const customEngine = customSearches.find(s => s.id === currentEngine);
        if (customEngine) {
            engine = customEngine;
        } else {
            // 默认使用谷歌
            engine = SEARCH_ENGINES.google;
            currentEngine = 'google';
        }
    }
    
    let searchUrl;
    
    // 检查是否是图片搜索
    if (engine.isImageSearch && (query.startsWith('http') || query.startsWith('data:'))) {
        // 图片搜索，直接使用查询词（应该是图片URL）
        searchUrl = engine.url.replace('{query}', encodeURIComponent(query));
    } else {
        // 普通搜索
        searchUrl = engine.url.replace('{query}', encodeURIComponent(query));
    }
    
    window.open(searchUrl, '_blank');
    searchInput.value = '';
    searchInput.focus();
}

// 更新日期时间
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    
    const timeStr = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    currentDate.textContent = dateStr;
    currentTime.textContent = timeStr;
}

// 更新日期时间显示
function updateDateTimeDisplay() {
    const show = showTimeDate.checked;
    currentDate.style.display = show ? 'inline' : 'none';
    currentTime.style.display = show ? 'inline' : 'none';
}

// 加载设置 - 删除showQuickSites相关代码
function loadSettings() {
    chrome.storage.sync.get(['wallpaper', 'customWallpaper', 'defaultEngine', 'showTimeDate'], (result) => {
        // 壁纸 - 优先级：用户上传 > 预设壁纸 > 默认壁纸
        if (result.customWallpaper) {
            // 用户上传的壁纸
            backgroundImage.style.backgroundImage = `url(${result.customWallpaper})`;
        } else if (result.wallpaper) {
            // 预设壁纸
            backgroundImage.style.backgroundImage = `url(${result.wallpaper})`;
        } else {
            // 使用内置默认壁纸
            const defaultWallpaperURL = getDefaultWallpaperURL();
            backgroundImage.style.backgroundImage = `url(${defaultWallpaperURL})`;
        }
        
        // 默认搜索引擎
        if (result.defaultEngine) {
            currentEngine = result.defaultEngine;
            
            // 更新单选按钮
            document.querySelectorAll('input[name="defaultEngine"]').forEach(radio => {
                radio.checked = radio.value === result.defaultEngine;
            });
        }
        
        // 只保留显示时间和日期选项
        if (result.showTimeDate !== undefined) {
            showTimeDate.checked = result.showTimeDate;
            updateDateTimeDisplay();
        }
    });
}

// 确保行存在（修复版）
function ensureRowExists(rowId, align = 'center') {
    // 第1行总是存在
    if (rowId === 1) return quickButtons;
    
    // 检查行是否已在customRows中
    let row = customRows.find(r => r.id === rowId);
    
    // 如果行不存在，创建它
    if (!row) {
        row = createCustomRow(rowId, align);
    }
    
    return row.element;
}

// 添加自定义搜索引擎（修复版）
function addCustomSearch() {
    const name = customSearchName.value.trim();
    let url = customSearchUrl.value.trim();
    const icon = customSearchIcon.value.trim();
    const row = parseInt(document.getElementById('customSearchRow').value);
    const align = document.querySelector('input[name="customSearchAlign"]:checked').value;
    
    if (!name || !url) {
        alert('请填写搜索引擎名称和URL');
        return;
    }
    
    // 替换占位符为{query}格式
    if (url.includes('%s')) {
        url = url.replace(/%s/g, '{query}');
    } else if (!url.includes('{query}')) {
        alert('URL中必须包含{query}作为搜索词的占位符');
        return;
    }
    
    // 确保行存在
    ensureRowExists(row, align);
    
    const id = 'custom_' + Date.now();
    const customSearch = {
        id,
        name,
        url,
        icon: icon || 'fas fa-search',
        row: row,
        align,
        isCustom: true
    };
    
    customSearches.push(customSearch);
    saveCustomSearches();
    renderCustomSearchButtons();
    renderCustomSearchList();
    
    // 更新行选择器
    updateRowSelection();
    
    // 清空表单
    customSearchName.value = '';
    customSearchUrl.value = '';
    customSearchIcon.value = '';
    
    // 重置图标预览
    const iconPreview = document.getElementById('iconPreview');
    if (iconPreview) {
        iconPreview.className = 'fas fa-search';
    }
    
    alert('搜索引擎添加成功！');
}

// 保存自定义搜索引擎
function saveCustomSearches() {
    chrome.storage.sync.set({ customSearches: customSearches });
}

// 加载自定义搜索引擎（修复版）
function loadCustomSearches() {
    chrome.storage.sync.get(['customSearches', 'customRows'], (result) => {
        if (result.customSearches) {
            customSearches = result.customSearches;
        }
        
        // 初始化自定义行
        initCustomRows();
        
        // 确保所有有自定义搜索引擎的行都存在
        customSearches.forEach(engine => {
            if (engine.row > 1) {
                const rowExists = customRows.some(row => row.id === engine.row);
                if (!rowExists) {
                    createCustomRow(engine.row, engine.align || 'center');
                }
            }
        });
        
        // 重新渲染
        renderCustomSearchButtons();
        renderCustomSearchList();
        
        // 更新行选择器
        updateRowSelection();
    });
}

// 渲染自定义搜索按钮（修复版）
function renderCustomSearchButtons() {
    // 清空所有行的自定义按钮
    customRows.forEach(row => {
        if (row.id > 1) {
            row.element.innerHTML = '';
        }
    });
    
    // 清空第一行的自定义按钮
    const firstRowCustomBtns = quickButtons.querySelectorAll('.custom-btn');
    firstRowCustomBtns.forEach(btn => btn.remove());
    
    // 设置每行的对齐方式
    customRows.forEach(row => {
        if (row.id > 1) {
            row.element.className = `custom-buttons-row ${row.align}-align`;
            row.element.id = `customRow${row.id}`;
        }
    });
    
    // 按行号分组自定义搜索引擎
    const enginesByRow = {};
    customSearches.forEach(engine => {
        if (!enginesByRow[engine.row]) {
            enginesByRow[engine.row] = [];
        }
        enginesByRow[engine.row].push(engine);
    });
    
    // 渲染每个自定义搜索引擎
    Object.keys(enginesByRow).sort((a, b) => a - b).forEach(rowId => {
        const engines = enginesByRow[rowId];
        
        engines.forEach(engine => {
            const button = createCustomSearchButton(engine);
            
            // 添加到对应的行
            const targetRow = customRows.find(row => row.id == rowId);
            if (targetRow) {
                targetRow.element.appendChild(button);
            } else {
                // 如果找不到对应的行，添加到第一行
                quickButtons.appendChild(button);
            }
        });
    });
}

// 创建自定义搜索按钮
function createCustomSearchButton(engine) {
    const button = document.createElement('button');
    button.className = 'custom-btn';
    button.dataset.engineId = engine.id;
    
    button.innerHTML = `
        <i class="${engine.icon}"></i>
        <span>${engine.name}</span>
        <button class="remove-btn" title="删除">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    button.addEventListener('click', (e) => {
        if (!e.target.closest('.remove-btn')) {
            currentEngine = engine.id;
            performSearch();
        }
    });
    
    // 删除按钮事件
    const removeBtn = button.querySelector('.remove-btn');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`确定要删除"${engine.name}"吗？`)) {
            removeCustomSearch(engine.id);
        }
    });
    
    return button;
}

// 移除自定义搜索引擎（修复版）
function removeCustomSearch(engineId) {
    // 找到要删除的搜索引擎
    const engineToRemove = customSearches.find(engine => engine.id === engineId);
    if (!engineToRemove) return;
    
    const rowId = engineToRemove.row;
    
    // 删除搜索引擎
    customSearches = customSearches.filter(engine => engine.id !== engineId);
    saveCustomSearches();
    
    // 重新渲染
    renderCustomSearchButtons();
    renderCustomSearchList();
    
    // 检查该行是否还有其他按钮
    const rowHasOtherButtons = customSearches.some(engine => engine.row === rowId);
    
    // 如果该行没有其他按钮，且不是第1行，移除该行的DOM元素
    if (!rowHasOtherButtons && rowId > 1) {
        const rowIndex = customRows.findIndex(row => row.id === rowId);
        if (rowIndex !== -1) {
            const row = customRows[rowIndex];
            if (row.element && row.element.parentNode) {
                row.element.remove();
            }
            customRows.splice(rowIndex, 1);
            saveRowConfig();
        }
    }
    
    // 如果当前选中的是被删除的引擎，切换到默认引擎
    if (currentEngine === engineId) {
        currentEngine = 'google';
    }
    
    // 更新行选择器
    updateRowSelection();
}

// 渲染自定义搜索引擎列表
function renderCustomSearchList() {
    customSearchList.innerHTML = '';
    
    if (customSearches.length === 0) {
        customSearchList.innerHTML = '<p style="text-align: center; color: #666; font-size: 14px;">暂无自定义搜索引擎</p>';
        return;
    }
    
    customSearches.forEach(engine => {
        const item = document.createElement('div');
        item.className = 'custom-search-item';
        
        item.innerHTML = `
            <div class="search-info">
                <i class="${engine.icon}"></i>
                <span>${engine.name}</span>
                <small style="color: #666; font-size: 12px;">(${engine.row === 1 ? '第一行' : '第' + engine.row + '行'})</small>
            </div>
            <button class="remove-item" data-id="${engine.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        const removeBtn = item.querySelector('.remove-item');
        removeBtn.addEventListener('click', () => {
            if (confirm(`确定要删除"${engine.name}"吗？`)) {
                removeCustomSearch(engine.id);
            }
        });
        
        customSearchList.appendChild(item);
    });
}

// 清除所有自定义搜索引擎（修复版）
function clearCustomSearches() {
    if (customSearches.length === 0) {
        alert('没有自定义搜索引擎可清除');
        return;
    }
    
    if (confirm('确定要清除所有自定义搜索引擎吗？')) {
        // 清除所有自定义搜索引擎数据
        customSearches = [];
        saveCustomSearches();
        
        // 移除所有自定义行（第1行除外）
        customRows.forEach(row => {
            if (row.id > 1 && row.element && row.element.parentNode) {
                row.element.remove();
            }
        });
        
        // 重置customRows，只保留第1行
        customRows = customRows.filter(row => row.id === 1);
        saveRowConfig();
        
        // 重新渲染
        renderCustomSearchButtons();
        renderCustomSearchList();
        
        // 如果当前选中的是自定义引擎，切换到默认引擎
        if (currentEngine.startsWith('custom_')) {
            currentEngine = 'google';
        }
        
        // 更新行选择器
        updateRowSelection();
        
        alert('已清除所有自定义搜索引擎');
    }
}