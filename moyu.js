// 节假日数据
const HOLIDAYS = {
    // 2024年节假日
    '元旦': '2024-01-01',
    '春节': '2024-02-10',
    '清明节': '2024-04-04',
    '劳动节': '2024-05-01',
    '端午节': '2024-06-10',
    '中秋节': '2024-09-17',
    '国庆节': '2024-10-01',
    
    // 2025年节假日
    '元旦2025': '2025-01-01',
    '春节2025': '2025-01-29',
    '清明节2025': '2025-04-04',
    '劳动节2025': '2025-05-01',
    '端午节2025': '2025-05-31',
    '中秋节2025': '2025-09-06',
    '国庆节2025': '2025-10-01',
    
    // 其他重要节日
    '妇女节': '2024-03-08',
    '植树节': '2024-03-12',
    '青年节': '2024-05-04',
    '儿童节': '2024-06-01',
    '建党节': '2024-07-01',
    '建军节': '2024-08-01',
    '教师节': '2024-09-10',
    '程序员日': '2024-10-24',
    '圣诞节': '2024-12-25'
};

// 添加摸鱼文案模板数组
const MOYU_TEMPLATES = [
    {
        greeting: "早上好，摸鱼人！工作再累也不要忘记摸鱼哦！",
        content: "有事没事起身去茶水间，去厕所，去廊道走走，别总在工位上坐着，钱是老板的，但健康是自己的。"
    },
    {
        greeting: "今天也是元气满满的一天呢，摸鱼人！",
        content: "起来活动活动，和同事聊聊天，去茶水间喝杯水，眺望下窗外的风景。记住，摸鱼才是本职工作！"
    },
    {
        greeting: "摸鱼人，你今天摸鱼了吗？",
        content: "多出去走走，别老在工位上坐着。工作虽然重要，但摸鱼也要适度，这样才能为老板多打几年工！"
    },
    {
        greeting: "摸鱼办提醒您：合理摸鱼，快乐工作！",
        content: "多去茶水间转转，顺便帮同事带杯水，这样你就又有了合理摸鱼的理由！记住，摸鱼才能保持年轻！"
    },
    {
        greeting: "摸鱼人，该休息了！",
        content: "起来倒杯水喝，活动活动筋骨，和同事聊聊天。记住：摸鱼才是终身事业！"
    },
    {
        greeting: "摸鱼办公室温馨提示：",
        content: "上班不摸鱼，和咸鱼有什么区别？适当摸鱼，有益身心健康。记住：要想生活过得去，每天摸鱼不能停！"
    },
    {
        greeting: "今日摸鱼小贴士：",
        content: "放假后容易犯困？去茶水间接杯咖啡，顺便和同事聊聊天。合理安排摸鱼时间，让工作更有效率！"
    },
    {
        greeting: "摸鱼办特别提醒：",
        content: "工位上坐久了容易腰酸背痛，多起来走动走动。记住：摸鱼才是提升幸福感的不二法门！"
    }
];

// 计算两个日期之间的天数
function getDaysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.ceil((date2 - date1) / oneDay);
}

// 获取下一个发工资日期
function getNextPayday(payday) {
    const today = new Date();
    let nextPayday = new Date(today.getFullYear(), today.getMonth(), payday);
    
    if (today > nextPayday) {
        nextPayday = new Date(today.getFullYear(), today.getMonth() + 1, payday);
    }
    
    return nextPayday;
}

// 获取下一个周末
function getNextWeekend() {
    const today = new Date();
    let daysUntilWeekend = 6 - today.getDay(); // 默认计算到周六的天数
    
    if (daysUntilWeekend <= 0) {
        daysUntilWeekend += 7; // 如果今天是周六或周日，计算到下个周六
    }
    
    return new Date(today.getTime() + daysUntilWeekend * 24 * 60 * 60 * 1000);
}

// 获取随机摸鱼文案
function getRandomMoyuText() {
    const index = Math.floor(Math.random() * MOYU_TEMPLATES.length);
    return MOYU_TEMPLATES[index];
}

// 修改生成提醒文本的函数
function generateReminder() {
    const paydayInput = document.getElementById('payday');
    const payday = parseInt(paydayInput.value);
    
    if (!payday || payday < 1 || payday > 31) {
        alert('请输入有效的发工资日期（1-31）');
        return;
    }

    const today = new Date();
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const nextPayday = getNextPayday(payday);
    const nextWeekend = getNextWeekend();
    
    // 获取随机摸鱼文案
    const moyuText = getRandomMoyuText();
    
    let reminderText = `【摸鱼办】提醒您：\n`;
    reminderText += `今天是${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日，星期${weekDays[today.getDay()]}。\n\n`;
    reminderText += `${moyuText.greeting}\n`;
    reminderText += `${moyuText.content}\n\n`;
    
    // 添加工作日进度（如果是工作日）
    if (today.getDay() > 0 && today.getDay() < 6) {
        const progress = Math.round((today.getHours() - 9) / 8 * 100);
        if (progress >= 0 && progress <= 100) {
            reminderText += `今日工作进度：${progress}%\n\n`;
        }
    }
    
    reminderText += `温馨提示：\n`;
    reminderText += `离【${payday}号发工资】还有：${getDaysBetween(today, nextPayday)}天\n`;
    reminderText += `距离【周末】还有：${getDaysBetween(today, nextWeekend)}天\n`;

    // 节假日倒计时部分保持不变
    const sortedHolidays = Object.entries(HOLIDAYS)
        .map(([name, date]) => ({
            name: name.replace(/2025$/, ''),
            date: new Date(date),
            daysLeft: getDaysBetween(today, new Date(date))
        }))
        .filter(holiday => holiday.date > today)
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 8);

    reminderText += '\n节假日倒计时：\n';
    sortedHolidays.forEach(holiday => {
        const spaces = '　'.repeat(Math.max(0, 4 - holiday.name.length));
        reminderText += `距离【${spaces}${holiday.name}】还有：${holiday.daysLeft}天\n`;
    });

    // 添加随机摸鱼表情
    const fishEmojis = ['🐟', '🐠', '🐡', '🎣', '🐬', '🐋', '🦈', '🐳'];
    const randomEmoji = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
    reminderText += `\n今日摸鱼指数：${randomEmoji}${randomEmoji}${randomEmoji}${randomEmoji}${randomEmoji}\n`;

    document.getElementById('reminder').textContent = reminderText;
}

// 页面加载完成后自动填充今天的日期
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    document.getElementById('payday').value = today.getDate();
    generateReminder();
});

// 添加一个新的辅助函数来格式化日期
function formatDate(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 添加复制功能
async function copyReminder() {
    const reminderText = document.getElementById('reminder').textContent;
    try {
        await navigator.clipboard.writeText(reminderText);
        
        // 显示复制成功的视觉反馈
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '复制成功！';
        copyBtn.classList.add('copy-success');
        
        // 1.5秒后恢复按钮原始状态
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copy-success');
        }, 1500);
    } catch (err) {
        // 如果剪贴板API不可用，使用传统方法
        const textarea = document.createElement('textarea');
        textarea.value = reminderText;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('复制成功！');
        } catch (err) {
            alert('复制失败，请手动复制。');
        }
        document.body.removeChild(textarea);
    }
} 