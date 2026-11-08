const sidebar = document.querySelector('#sidebar');
const scrim = document.querySelector('.mobile-scrim');
const toast = document.querySelector('#toast');
const modal = document.querySelector('#employeeModal');
const pageLoader = document.querySelector('#pageLoader');

function finishPageLoad() {
  document.body.classList.add('page-ready');
  pageLoader?.classList.add('hidden');
  window.setTimeout(() => pageLoader?.remove(), 420);
}

window.addEventListener('DOMContentLoaded', () => {
  window.setTimeout(finishPageLoad, 420);
}, { once: true });

const iconPaths = {
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  ellipsis: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  'layout-dashboard': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  'users-round': '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 6"/>',
  'briefcase-business': '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
  'chart-line': '<path d="M3 3v18h18M7 16l4-5 3 2 5-7"/>',
  'wallet-cards': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M16 14h2"/>',
  'clock-3': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  heart: '<path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z"/>',
  'chart-column': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  'graduation-cap': '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5M21 10v6"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  'settings-2': '<path d="M20 7h-9M14 17H4M17 4v6M7 14v6"/><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/>',
  'building-2': '<path d="M4 21V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v17M2 21h20M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2"/>',
  'circle-check-big': '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  'calendar-x-2': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4M8 2v4M3 9h18M15 13l4 4M19 13l-4 4"/>',
  'list-filter': '<path d="M3 6h18M6 12h12M10 18h4"/>'
};

function renderLocalIcons() {
  const namespace = 'http://www.w3.org/2000/svg';
  document.querySelectorAll('[data-lucide]').forEach((icon) => {
    const svg = document.createElementNS(namespace, 'svg');
    const name = icon.getAttribute('data-lucide');
    svg.classList.add('lucide', ...icon.classList);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.7');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', icon.getAttribute('aria-hidden') || 'true');
    svg.innerHTML = iconPaths[name] || iconPaths.ellipsis;
    icon.replaceWith(svg);
  });
}

renderLocalIcons();

const kpiIconSources = [
  'kpi-icon-01.svg',
  'kpi-icon-02.svg',
  'kpi-icon-03.svg',
  'kpi-icon-04.svg',
  'kpi-icon-05.svg'
];

document.querySelectorAll('.analytics-cards .analytics-card').forEach((card, index) => {
  const oldIcon = card.querySelector('.analytics-card-heading .lucide');
  const source = kpiIconSources[index];
  if (!oldIcon || !source) return;

  const icon = document.createElement('img');
  icon.className = 'kpi-icon';
  icon.src = source;
  icon.alt = '';
  icon.setAttribute('aria-hidden', 'true');
  oldIcon.replaceWith(icon);
});

const panelTitleReplacements = [
  ['.attrition-panel h2', 'Attrition by Department'],
  ['.performance-panel h2', 'Performance Matrix']
];

panelTitleReplacements.forEach(([selector, title]) => {
  const heading = document.querySelector(selector);
  if (heading) heading.textContent = title;
});

const attritionValues = [20, 15, 12, 8, 9, 7, 5];
document.querySelectorAll('.attrition-row').forEach((row, index) => {
  const track = row.querySelector('.attrition-bar-track');
  const value = attritionValues[index];
  if (!track || value === undefined) return;

  const valueLabel = document.createElement('span');
  valueLabel.className = 'attrition-value';
  valueLabel.textContent = `${value}%`;
  track.append(valueLabel);
});

const hoursGraphPoints = [
  [0, 132], [73, 126], [145, 137], [218, 121], [291, 115], [364, 110],
  [436, 115], [509, 124], [582, 125], [655, 101], [727, 121], [800, 126]
];
const hoursLine = document.querySelector('.hours-line');
const hoursFill = document.querySelector('.hours-fill');
const hoursPointPath = hoursGraphPoints.map(([x, y], index) => {
  if (index === 0) return `M ${x} ${y}`;
  const [previousX, previousY] = hoursGraphPoints[index - 1];
  const segment = (x - previousX) / 3;
  return `C ${previousX + segment} ${previousY}, ${x - segment} ${y}, ${x} ${y}`;
}).join(' ');

if (hoursLine && hoursFill) {
  hoursLine.setAttribute('d', hoursPointPath);
  hoursFill.setAttribute('d', `${hoursPointPath} L 800 220 L 0 220 Z`);
}

document.querySelectorAll('.hours-points circle').forEach((point, index) => {
  const [x, y] = hoursGraphPoints[index];
  point.setAttribute('cx', x);
  point.setAttribute('cy', y);
  point.setAttribute('r', '3');
});

const hoursPlot = document.querySelector('.hours-plot');
const hoursTooltip = document.createElement('div');
hoursTooltip.className = 'hours-tooltip';
hoursTooltip.setAttribute('role', 'status');
hoursTooltip.setAttribute('aria-hidden', 'true');
hoursPlot?.append(hoursTooltip);

const hoursMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const hoursYearSelect = document.querySelector('#hoursYear');

function showHoursTooltip(point, index) {
  if (!hoursPlot || !hoursTooltip) return;

  const [, y] = hoursGraphPoints[index];
  const hours = (10 - (y / 55)).toFixed(1);
  const year = hoursYearSelect?.value || '2024';
  const plotRect = hoursPlot.getBoundingClientRect();
  const pointRect = point.getBoundingClientRect();

  hoursTooltip.innerHTML = `<span>${hoursMonths[index]} ${year}</span><strong>${hours} hrs</strong>`;
  hoursTooltip.classList.add('visible');
  hoursTooltip.setAttribute('aria-hidden', 'false');

  const pointX = pointRect.left + (pointRect.width / 2) - plotRect.left;
  const pointY = pointRect.top - plotRect.top;
  const tooltipWidth = hoursTooltip.offsetWidth;
  const left = Math.min(Math.max(pointX, tooltipWidth / 2 + 4), plotRect.width - tooltipWidth / 2 - 4);

  hoursTooltip.style.left = `${left}px`;
  hoursTooltip.style.top = `${Math.max(4, pointY - hoursTooltip.offsetHeight - 10)}px`;
}

function hideHoursTooltip() {
  hoursTooltip?.classList.remove('visible');
  hoursTooltip?.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.hours-points circle').forEach((point, index) => {
  point.addEventListener('pointerenter', () => showHoursTooltip(point, index));
  point.addEventListener('pointermove', () => showHoursTooltip(point, index));
  point.addEventListener('pointerleave', hideHoursTooltip);
  point.addEventListener('focus', () => showHoursTooltip(point, index));
  point.addEventListener('blur', hideHoursTooltip);
});

const employeeSearch = document.querySelector('#employeeSearch');
const directorySearch = document.querySelector('#directorySearch');
const employeeRows = [...document.querySelectorAll('.employees-panel tbody tr')];
const profileMenuTrigger = document.querySelector('.topbar-user');

if (profileMenuTrigger) {
  profileMenuTrigger.classList.add('profile-menu-container');
  profileMenuTrigger.setAttribute('tabindex', '0');
  profileMenuTrigger.setAttribute('aria-haspopup', 'menu');
  profileMenuTrigger.setAttribute('aria-expanded', 'false');

  const profileMenu = document.createElement('div');
  profileMenu.className = 'profile-menu';
  profileMenu.setAttribute('role', 'menu');
  profileMenu.innerHTML = '<button class="profile-menu-item" type="button" role="menuitem">Log out</button>';
  profileMenuTrigger.append(profileMenu);

  const logoutButton = profileMenu.querySelector('.profile-menu-item');
  const toggleProfileMenu = (open) => {
    profileMenu.classList.toggle('open', open);
    profileMenuTrigger.setAttribute('aria-expanded', String(open));
  };

  profileMenuTrigger.addEventListener('click', (event) => {
    if (event.target.closest('.profile-menu')) return;
    toggleProfileMenu(!profileMenu.classList.contains('open'));
  });

  profileMenuTrigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleProfileMenu(!profileMenu.classList.contains('open'));
    }
    if (event.key === 'Escape') toggleProfileMenu(false);
  });

  logoutButton?.addEventListener('click', () => {
    toggleProfileMenu(false);
    showToast('Logged out');
  });

  document.addEventListener('click', (event) => {
    if (!profileMenuTrigger.contains(event.target)) toggleProfileMenu(false);
  });
}

const filterEmployeeRows = (event) => {
  const query = event.target.value.trim().toLowerCase();
  employeeRows.forEach((row) => {
    row.hidden = query.length > 0 && !row.textContent.toLowerCase().includes(query);
  });
};

employeeSearch?.addEventListener('input', filterEmployeeRows);
directorySearch?.addEventListener('input', filterEmployeeRows);

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    employeeSearch?.focus();
  }
});

const salaryFilter = document.querySelector('#salaryFilter');
const salaryValue = document.querySelector('#salaryValue');

const departmentFilter = document.querySelector('#departmentFilter');
const levelFilter = document.querySelector('#levelFilter');
const statusFilter = document.querySelector('#statusFilter');
const analyticsFilters = document.querySelector('.analytics-filters');
const appliedFilters = document.createElement('div');
appliedFilters.className = 'applied-filters';
appliedFilters.setAttribute('aria-label', 'Applied filters');
analyticsFilters?.append(appliedFilters);

function renderAppliedFilters() {
  if (!appliedFilters) return;

  const activeFilters = [];
  const filterDefinitions = [
    [departmentFilter, 'Department'],
    [levelFilter, 'Job level'],
    [statusFilter, 'Employment status']
  ];

  filterDefinitions.forEach(([filter, label]) => {
    if (filter && filter.selectedIndex > 0) {
      activeFilters.push({ key: filter.id, label: filter.value, filter });
    }
  });

  if (salaryFilter && Number(salaryFilter.value) < Number(salaryFilter.max)) {
    activeFilters.push({
      key: salaryFilter.id,
      label: `Salary: $40k – $${salaryFilter.value}k`,
      filter: salaryFilter
    });
  }

  appliedFilters.replaceChildren();
  const title = document.createElement('span');
  title.className = 'applied-filters-title';
  title.textContent = 'Applied Filters:';
  appliedFilters.append(title);

  activeFilters.forEach(({ key, label, filter }) => {
    const chip = document.createElement('button');
    chip.className = 'filter-chip';
    chip.type = 'button';
    chip.dataset.filter = key;
    chip.innerHTML = `${label}<span aria-hidden="true">×</span>`;
    chip.addEventListener('click', () => {
      if (filter.tagName === 'SELECT') filter.selectedIndex = 0;
      if (filter === salaryFilter) {
        filter.value = filter.max;
        if (salaryValue) salaryValue.textContent = '$40k – $300k+';
      }
      renderAppliedFilters();
    });
    appliedFilters.append(chip);
  });

  const clearButton = document.createElement('button');
  clearButton.className = 'clear-filters';
  clearButton.type = 'button';
  clearButton.textContent = 'Clear All';
  clearButton.addEventListener('click', () => {
    [departmentFilter, levelFilter, statusFilter].forEach((filter) => {
      if (filter) filter.selectedIndex = 0;
    });
    if (salaryFilter) salaryFilter.value = salaryFilter.max;
    if (salaryValue) salaryValue.textContent = '$40k – $300k+';
    renderAppliedFilters();
  });
  appliedFilters.append(clearButton);
}

document.querySelectorAll('#departmentFilter, #levelFilter, #statusFilter').forEach((filter) => {
  filter.addEventListener('change', (event) => {
    showToast(`${event.target.value} selected`);
    renderAppliedFilters();
  });
});

if (salaryFilter) {
  const salaryScale = document.createElement('div');
  salaryScale.className = 'salary-scale';
  salaryScale.setAttribute('aria-hidden', 'true');
  salaryScale.innerHTML = '<span>$40k</span><span>$300k+</span>';
  salaryFilter.parentElement?.append(salaryScale);
}

salaryFilter?.addEventListener('input', (event) => {
  const maximum = Number(event.target.value);
  if (salaryValue) salaryValue.textContent = `$40k – $${maximum}k${maximum === 300 ? '+' : ''}`;
  renderAppliedFilters();
});

renderAppliedFilters();

document.querySelectorAll('[data-hours-period]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-hours-period]').forEach((periodButton) => periodButton.classList.remove('active'));
    button.classList.add('active');
    const title = document.querySelector('.working-hours-header p');
    if (title) title.textContent = button.dataset.hoursPeriod;
  });
});

document.querySelector('#hoursYear')?.addEventListener('change', (event) => showToast(`Showing working hours for ${event.target.value}`));

function toggleSidebar(open) {
  sidebar.classList.toggle('open', open);
  scrim.classList.toggle('open', open);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelector('[data-sidebar-open]')?.addEventListener('click', () => toggleSidebar(true));
document.querySelectorAll('[data-sidebar-close]').forEach((button) => button.addEventListener('click', () => toggleSidebar(false)));
document.querySelectorAll('[data-nav]').forEach((item) => item.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('[data-nav]').forEach((navItem) => navItem.classList.remove('active'));
  item.classList.add('active');
  if (window.innerWidth <= 1024) toggleSidebar(false);
  if (item.dataset.nav !== 'Overview') showToast(`${item.dataset.nav} is ready to explore`);
}));

document.querySelector('#exportButton')?.addEventListener('click', () => showToast('Dashboard export prepared'));
document.querySelector('#attendanceRange')?.addEventListener('change', (event) => showToast(`Showing attendance for ${event.target.value.toLowerCase()}`));

function setModal(open) {
  modal.classList.toggle('open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) window.setTimeout(() => modal.querySelector('input')?.focus(), 50);
}

document.querySelector('#addEmployeeButton')?.addEventListener('click', () => setModal(true));
document.querySelector('#closeModal')?.addEventListener('click', () => setModal(false));
document.querySelector('#cancelModal')?.addEventListener('click', () => setModal(false));
modal?.addEventListener('click', (event) => { if (event.target === modal) setModal(false); });
document.querySelector('#employeeForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(event.currentTarget).get('name');
  setModal(false);
  event.currentTarget.reset();
  showToast(`${name} was added to your directory`);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { toggleSidebar(false); if (modal?.classList.contains('open')) setModal(false); }
});
