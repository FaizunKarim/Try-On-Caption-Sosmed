// Single Image State
// Format: null | { type: 'base64' | 'url', value: string, name?: string }
let uploadedImage = null;

// Global Age Unit State ('Tahun' | 'Bulan')
let currentAgeUnit = 'Tahun';

// Standar Antropometri Rata-rata TB (cm) & BB (kg) per Umur Persis (WHO, Permenkes 2020, & Riskesdas)
const ANTHROPOMETRIC_DATA = {
  'Laki-laki': {
    0: { height: 50, weight: 3.3 },
    1: { height: 75, weight: 9.6 },
    2: { height: 87, weight: 12.2 },
    3: { height: 96, weight: 14.3 },
    4: { height: 103, weight: 16.3 },
    5: { height: 110, weight: 18.3 },
    6: { height: 116, weight: 20.5 },
    7: { height: 122, weight: 23.0 },
    8: { height: 128, weight: 25.6 },
    9: { height: 133, weight: 28.6 },
    10: { height: 138, weight: 32.0 },
    11: { height: 143, weight: 36.0 },
    12: { height: 149, weight: 40.5 },
    13: { height: 156, weight: 45.8 },
    14: { height: 163, weight: 51.5 },
    15: { height: 169, weight: 56.7 },
    16: { height: 173, weight: 61.0 },
    17: { height: 175, weight: 64.5 },
    18: { height: 168, weight: 63.5 },
    25: { height: 168, weight: 64.0 },
    35: { height: 168, weight: 66.0 },
    45: { height: 166.5, weight: 67.5 },
    55: { height: 164.5, weight: 66.5 },
    65: { height: 161.0, weight: 63.5 },
    75: { height: 158.0, weight: 59.5 },
    80: { height: 155.0, weight: 56.0 }
  },
  'Perempuan': {
    0: { height: 49, weight: 3.2 },
    1: { height: 74, weight: 8.9 },
    2: { height: 86, weight: 11.5 },
    3: { height: 95, weight: 13.9 },
    4: { height: 102, weight: 16.0 },
    5: { height: 109, weight: 18.2 },
    6: { height: 115, weight: 20.2 },
    7: { height: 121, weight: 22.4 },
    8: { height: 127, weight: 25.0 },
    9: { height: 133, weight: 28.2 },
    10: { height: 138, weight: 31.9 },
    11: { height: 144, weight: 36.8 },
    12: { height: 151, weight: 41.5 },
    13: { height: 157, weight: 46.0 },
    14: { height: 160, weight: 49.8 },
    15: { height: 162, weight: 52.3 },
    16: { height: 163, weight: 54.0 },
    17: { height: 164, weight: 55.0 },
    18: { height: 157, weight: 53.5 },
    25: { height: 157, weight: 54.0 },
    35: { height: 157, weight: 56.0 },
    45: { height: 155.5, weight: 57.0 },
    55: { height: 153.5, weight: 56.0 },
    65: { height: 150.5, weight: 53.0 },
    75: { height: 147.5, weight: 49.5 },
    80: { height: 145.0, weight: 46.0 }
  }
};

// Standar Pertumbuhan Bulanan Bayi & Balita WHO (0 - 36 Bulan)
const WHO_MONTHLY_DATA = {
  'Laki-laki': {
    0: { height: 50.0, weight: 3.3 },
    1: { height: 54.7, weight: 4.5 },
    2: { height: 58.4, weight: 5.6 },
    3: { height: 61.4, weight: 6.4 },
    4: { height: 63.9, weight: 7.0 },
    5: { height: 65.9, weight: 7.5 },
    6: { height: 67.6, weight: 7.9 },
    7: { height: 69.2, weight: 8.3 },
    8: { height: 70.6, weight: 8.6 },
    9: { height: 72.0, weight: 8.9 },
    10: { height: 73.3, weight: 9.2 },
    11: { height: 74.5, weight: 9.4 },
    12: { height: 75.7, weight: 9.6 },
    15: { height: 79.1, weight: 10.3 },
    18: { height: 82.3, weight: 10.9 },
    21: { height: 85.1, weight: 11.5 },
    24: { height: 87.1, weight: 12.2 },
    30: { height: 91.9, weight: 13.3 },
    36: { height: 96.1, weight: 14.3 }
  },
  'Perempuan': {
    0: { height: 49.0, weight: 3.2 },
    1: { height: 53.7, weight: 4.2 },
    2: { height: 57.1, weight: 5.1 },
    3: { height: 59.8, weight: 5.8 },
    4: { height: 62.1, weight: 6.4 },
    5: { height: 64.0, weight: 6.9 },
    6: { height: 65.7, weight: 7.3 },
    7: { height: 67.3, weight: 7.7 },
    8: { height: 68.7, weight: 8.0 },
    9: { height: 70.1, weight: 8.2 },
    10: { height: 71.5, weight: 8.5 },
    11: { height: 72.8, weight: 8.7 },
    12: { height: 74.0, weight: 8.9 },
    15: { height: 77.5, weight: 9.6 },
    18: { height: 80.7, weight: 10.2 },
    21: { height: 83.7, weight: 10.9 },
    24: { height: 85.7, weight: 11.5 },
    30: { height: 90.7, weight: 12.7 },
    36: { height: 95.1, weight: 13.9 }
  }
};

function onAgeUnitSelectChange(el) {
  const unit = el ? el.value : 'Tahun';
  setAgeUnit(unit);
}

function setAgeUnit(unit) {
  currentAgeUnit = unit === 'Bulan' ? 'Bulan' : 'Tahun';
  const selectEl = document.getElementById('ageUnitSelect');
  const suffix = document.getElementById('ageUnitSuffix');
  const ageInput = document.getElementById('modelAge');

  if (selectEl && selectEl.value !== currentAgeUnit) {
    selectEl.value = currentAgeUnit;
  }

  if (currentAgeUnit === 'Bulan') {
    if (suffix) suffix.innerText = "Bulan";
    if (ageInput) {
      ageInput.placeholder = "Contoh: 6";
      const currentVal = parseInt(ageInput.value, 10);
      if (isNaN(currentVal) || currentVal > 36 || currentVal === 25) {
        ageInput.value = 6;
      }
    }
  } else {
    if (suffix) suffix.innerText = "Tahun";
    if (ageInput) {
      ageInput.placeholder = "Contoh: 25";
      const currentVal = parseInt(ageInput.value, 10);
      if (isNaN(currentVal) || currentVal <= 0) {
        ageInput.value = 25;
      }
    }
  }

  updateAgePresetsUI();
  if (ageInput) onAgeInputChange(ageInput);
}

function updateAgePresetsUI() {
  const container = document.getElementById('ageQuickPresetsContainer');
  if (!container) return;

  if (currentAgeUnit === 'Bulan') {
    container.innerHTML = `
      <span class="text-[10px] text-slate-400 font-bold mr-1">Pilih Cepat:</span>
      <button type="button" onclick="setQuickAge(3, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">3 bln (Bayi)</button>
      <button type="button" onclick="setQuickAge(6, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">6 bln (Bayi)</button>
      <button type="button" onclick="setQuickAge(9, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">9 bln (Bayi)</button>
      <button type="button" onclick="setQuickAge(12, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">12 bln (1 Th)</button>
      <button type="button" onclick="setQuickAge(18, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">18 bln (1.5 Th)</button>
      <button type="button" onclick="setQuickAge(24, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">24 bln (2 Th)</button>
    `;
  } else {
    container.innerHTML = `
      <span class="text-[10px] text-slate-400 font-bold mr-1">Pilih Cepat:</span>
      <button type="button" onclick="setQuickAge(3, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">3 bln (Bayi)</button>
      <button type="button" onclick="setQuickAge(6, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">6 bln (Bayi)</button>
      <button type="button" onclick="setQuickAge(9, 'Bulan')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">9 bln (Bayi)</button>
      <button type="button" onclick="setQuickAge(3, 'Tahun')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">3 th (Balita)</button>
      <button type="button" onclick="setQuickAge(8, 'Tahun')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">8 th (Anak)</button>
      <button type="button" onclick="setQuickAge(15, 'Tahun')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">15 th (Remaja)</button>
      <button type="button" onclick="setQuickAge(25, 'Tahun')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">25 th (Dewasa)</button>
      <button type="button" onclick="setQuickAge(65, 'Tahun')" class="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200/80 transition cursor-pointer">65 th (Lansia)</button>
    `;
  }
}

function getStandardMetricsForAge(ageNum, genderStr, unitStr = currentAgeUnit) {
  const gender = (genderStr === 'Perempuan') ? 'Perempuan' : 'Laki-laki';
  let age = parseInt(ageNum, 10);
  if (isNaN(age) || age < 0) age = 0;

  if (unitStr === 'Bulan') {
    if (age > 36) {
      const equivalentYears = Math.round(age / 12);
      return getStandardMetricsForAge(equivalentYears, genderStr, 'Tahun');
    }
    const table = WHO_MONTHLY_DATA[gender];
    if (table[age]) {
      return { height: table[age].height, weight: table[age].weight };
    }
    const months = Object.keys(table).map(Number).sort((a, b) => a - b);
    let lower = months[0];
    let upper = months[months.length - 1];

    for (let i = 0; i < months.length; i++) {
      if (months[i] <= age) lower = months[i];
      if (months[i] >= age) {
        upper = months[i];
        break;
      }
    }

    if (lower === upper) {
      return { height: table[lower].height, weight: table[lower].weight };
    }

    const factor = (age - lower) / (upper - lower);
    const height = Math.round((table[lower].height + factor * (table[upper].height - table[lower].height)) * 10) / 10;
    const weight = Math.round((table[lower].weight + factor * (table[upper].weight - table[lower].weight)) * 10) / 10;

    return { height, weight };
  } else {
    const table = ANTHROPOMETRIC_DATA[gender];
    if (age > 80) age = 80;

    if (table[age]) {
      return { height: table[age].height, weight: table[age].weight };
    }

    const ages = Object.keys(table).map(Number).sort((a, b) => a - b);
    let lower = ages[0];
    let upper = ages[ages.length - 1];

    for (let i = 0; i < ages.length; i++) {
      if (ages[i] <= age) lower = ages[i];
      if (ages[i] >= age) {
        upper = ages[i];
        break;
      }
    }

    if (lower === upper) {
      return { height: table[lower].height, weight: table[lower].weight };
    }

    const factor = (age - lower) / (upper - lower);
    const height = Math.round((table[lower].height + factor * (table[upper].height - table[lower].height)) * 10) / 10;
    const weight = Math.round((table[lower].weight + factor * (table[upper].weight - table[lower].weight)) * 10) / 10;

    return { height, weight };
  }
}

// Dynamic Demographic Garment Sizing (ISO 8559 & SNI Apparel Standards)
function renderClothingSizeOptions(ageNum, unitStr = currentAgeUnit) {
  const rawAge = parseInt(ageNum, 10) || 0;
  const ageYears = unitStr === 'Bulan' ? (rawAge / 12) : rawAge;
  const container = document.getElementById('clothingSizeContainer');
  const sizeLineBadge = document.getElementById('sizeLineBadge');
  if (!container) return;

  let sizeLineText = 'Adult Apparel Line';
  let options = [];

  if (ageYears <= 1.5) {
    sizeLineText = 'Infant / Baby Line (0-1.5 Th)';
    options = [
      { value: 'NB (Newborn 0-1M)', label: 'NB', sub: 'Newborn (0-1M)' },
      { value: '3-6M (Bayi 3-6 bulan)', label: '3-6M', sub: 'Bayi 3-6 Bulan' },
      { value: '6-12M (Bayi 6-12 bulan)', label: '6-12M', sub: 'Bayi 6-12 Bulan' },
      { value: '12-18M (Bayi 12-18 bulan)', label: '12-18M', sub: 'Bayi 12-18 Bulan' },
      { value: '18-24M (Bayi 18-24 bulan)', label: '18-24M', sub: 'Bayi 18-24 Bulan' }
    ];
  } else if (ageYears <= 11) {
    sizeLineText = 'Kids Apparel Line (2-11 Th)';
    options = [
      { value: 'Kids XS (Balita 2-3 th)', label: 'Kids XS', sub: 'Balita 2-3 Th' },
      { value: 'Kids S (Balita 4-5 th)', label: 'Kids S', sub: 'Balita 4-5 Th' },
      { value: 'Kids M (Anak 6-7 th)', label: 'Kids M', sub: 'Anak 6-7 Th' },
      { value: 'Kids L (Anak 8-9 th)', label: 'Kids L', sub: 'Anak 8-9 Th' },
      { value: 'Kids XL (Anak 10-11 th)', label: 'Kids XL', sub: 'Anak 10-11 Th' }
    ];
  } else {
    sizeLineText = 'Adult Apparel Line (12+ Th)';
    options = [
      { value: 'Adult XS (Sangat Kecil / Slim)', label: 'Adult XS', sub: 'Extra Small' },
      { value: 'Adult S (Kecil / Fit)', label: 'Adult S', sub: 'Small Fit' },
      { value: 'Adult M (Sedang / Regular Fit)', label: 'Adult M', sub: 'Medium Ideal' },
      { value: 'Adult L (Besar / Pas Longgar)', label: 'Adult L', sub: 'Large Fit' },
      { value: 'Adult XL (Extra Besar / Loose)', label: 'Adult XL', sub: 'Extra Large' },
      { value: 'Adult XXL (Jumbo / Big Size)', label: 'Adult XXL', sub: 'Jumbo 2XL' },
      { value: 'Adult XXXL (Super Jumbo)', label: 'Adult XXXL', sub: 'Super Jumbo' }
    ];
  }

  if (sizeLineBadge) {
    sizeLineBadge.innerText = sizeLineText;
  }

  container.innerHTML = options.map((opt) => `
    <label class="fit-option cursor-pointer">
      <input type="radio" name="clothingFit" value="${opt.value}" class="hidden peer" onchange="onFitChange(this)">
      <div class="p-2.5 rounded-2xl border-2 border-slate-200 peer-checked:border-teal-500 peer-checked:bg-teal-50/60 peer-checked:text-teal-800 hover:border-teal-300 transition-all text-center group">
        <div class="text-xs font-extrabold group-hover:text-teal-600">${opt.label}</div>
        <div class="text-[9px] text-slate-400 peer-checked:text-teal-600 font-medium mt-0.5">${opt.sub}</div>
      </div>
    </label>
  `).join('');
}

// 4-Tier Age-Specific Recommendation Engine (Demographic Apparel Line + Body Ratio Adjustment)
function calculateAgeStratifiedFit(heightCm, weightKg, ageNum, genderStr, unitStr = currentAgeUnit) {
  const hM = heightCm / 100;
  if (!hM || hM <= 0 || !weightKg || weightKg <= 0) {
    return {
      fitValue: 'Adult M (Sedang / Regular Fit)',
      bmi: 0,
      label: 'Sedang Standar',
      badgeText: 'Adult M'
    };
  }

  const bmi = Math.round((weightKg / (hM * hM)) * 10) / 10;
  const rawAge = parseInt(ageNum, 10) || 0;
  const ageYears = unitStr === 'Bulan' ? (rawAge / 12) : rawAge;
  const std = getStandardMetricsForAge(rawAge, genderStr, unitStr);
  const stdHM = std.height / 100;
  const stdBmi = std.weight / (stdHM * stdHM);
  const ratio = (weightKg / (hM * hM)) / (stdBmi || 1);

  let fitValue = 'Adult M (Sedang / Regular Fit)';
  let label = '';
  let badgeText = 'Adult M';

  // Stratum 1: Bayi & Balita Muda (0 - 1.5 Tahun) -> Infant Apparel Line
  if (ageYears <= 1.5) {
    if (unitStr === 'Bulan') {
      if (rawAge <= 1) {
        if (ratio >= 1.25) {
          fitValue = '3-6M (Bayi 3-6 bulan)';
          label = `Bayi ${rawAge} Bln Berisi (3-6M)`;
          badgeText = '3-6M';
        } else {
          fitValue = 'NB (Newborn 0-1M)';
          label = `Ukuran Bayi ${rawAge} Bln (NB)`;
          badgeText = 'NB';
        }
      } else if (rawAge <= 4) {
        if (ratio < 0.85) {
          fitValue = 'NB (Newborn 0-1M)';
          label = `Bayi ${rawAge} Bln Slim (NB)`;
          badgeText = 'NB';
        } else if (ratio <= 1.20) {
          fitValue = '3-6M (Bayi 3-6 bulan)';
          label = `Standar Bayi ${rawAge} Bln (3-6M)`;
          badgeText = '3-6M';
        } else {
          fitValue = '6-12M (Bayi 6-12 bulan)';
          label = `Bayi ${rawAge} Bln Berisi (6-12M)`;
          badgeText = '6-12M';
        }
      } else if (rawAge <= 9) {
        if (ratio < 0.85) {
          fitValue = '3-6M (Bayi 3-6 bulan)';
          label = `Bayi ${rawAge} Bln Slim (3-6M)`;
          badgeText = '3-6M';
        } else if (ratio <= 1.20) {
          fitValue = '6-12M (Bayi 6-12 bulan)';
          label = `Standar Bayi ${rawAge} Bln (6-12M)`;
          badgeText = '6-12M';
        } else {
          fitValue = '12-18M (Bayi 12-18 bulan)';
          label = `Bayi ${rawAge} Bln Berisi (12-18M)`;
          badgeText = '12-18M';
        }
      } else if (rawAge <= 14) {
        if (ratio < 0.85) {
          fitValue = '6-12M (Bayi 6-12 bulan)';
          label = `Bayi ${rawAge} Bln Slim (6-12M)`;
          badgeText = '6-12M';
        } else if (ratio <= 1.20) {
          fitValue = '12-18M (Bayi 12-18 bulan)';
          label = `Standar Bayi ${rawAge} Bln (12-18M)`;
          badgeText = '12-18M';
        } else {
          fitValue = '18-24M (Bayi 18-24 bulan)';
          label = `Bayi ${rawAge} Bln Berisi (18-24M)`;
          badgeText = '18-24M';
        }
      } else {
        if (ratio < 0.85) {
          fitValue = '12-18M (Bayi 12-18 bulan)';
          label = `Bayi ${rawAge} Bln Slim (12-18M)`;
          badgeText = '12-18M';
        } else {
          fitValue = '18-24M (Bayi 18-24 bulan)';
          label = `Standar Bayi ${rawAge} Bln (18-24M)`;
          badgeText = '18-24M';
        }
      }
    } else {
      if (rawAge === 0) {
        fitValue = 'NB (Newborn 0-1M)';
        label = 'Ukuran Bayi Baru Lahir (NB)';
        badgeText = 'NB';
      } else {
        if (ratio < 0.85) {
          fitValue = '3-6M (Bayi 3-6 bulan)';
          label = 'Bayi 1 Th Slim (3-6M)';
          badgeText = '3-6M';
        } else if (ratio <= 1.18) {
          fitValue = '6-12M (Bayi 6-12 bulan)';
          label = 'Standar Bayi 1 Th (6-12M)';
          badgeText = '6-12M';
        } else {
          fitValue = '12-18M (Bayi 12-18 bulan)';
          label = 'Bayi 1 Th Berisi (12-18M)';
          badgeText = '12-18M';
        }
      }
    }
  }
  // Stratum 2: Balita & Anak-anak (1.6 - 11 Tahun) -> Kids Apparel Line
  else if (ageYears <= 11) {
    const bmiDiff = bmi - stdBmi;
    if (ageYears <= 3) {
      if (ratio < 0.82) {
        fitValue = 'Kids XS (Balita 2-3 th)';
        label = 'Balita Slim (Kids XS)';
        badgeText = 'Kids XS';
      } else if (ratio <= 1.18) {
        fitValue = 'Kids XS (Balita 2-3 th)';
        label = 'Standar Balita 2-3 th (Kids XS)';
        badgeText = 'Kids XS';
      } else if (ratio <= 1.35) {
        fitValue = 'Kids S (Balita 4-5 th)';
        label = 'Balita Berisi (Kids S)';
        badgeText = 'Kids S';
      } else {
        fitValue = 'Kids M (Anak 6-7 th)';
        label = 'Balita Gemuk (Kids M)';
        badgeText = 'Kids M';
      }
    } else if (ageYears <= 5) {
      if (ratio < 0.85) {
        fitValue = 'Kids XS (Balita 2-3 th)';
        label = 'Balita 4-5 th Slim (Kids XS)';
        badgeText = 'Kids XS';
      } else if (ratio <= 1.18) {
        fitValue = 'Kids S (Balita 4-5 th)';
        label = 'Standar Balita 4-5 th (Kids S)';
        badgeText = 'Kids S';
      } else if (ratio <= 1.35) {
        fitValue = 'Kids M (Anak 6-7 th)';
        label = 'Balita 4-5 th Berisi (Kids M)';
        badgeText = 'Kids M';
      } else {
        fitValue = 'Kids L (Anak 8-9 th)';
        label = 'Balita 4-5 th Gemuk (Kids L)';
        badgeText = 'Kids L';
      }
    } else if (ageYears <= 7) {
      if (bmiDiff < -2.5) {
        fitValue = 'Kids S (Balita 4-5 th)';
        label = 'Anak 6-7 th Slim (Kids S)';
        badgeText = 'Kids S';
      } else if (bmiDiff <= 2.5) {
        fitValue = 'Kids M (Anak 6-7 th)';
        label = 'Standar Anak 6-7 th (Kids M)';
        badgeText = 'Kids M';
      } else {
        fitValue = 'Kids L (Anak 8-9 th)';
        label = 'Anak 6-7 th Berisi (Kids L)';
        badgeText = 'Kids L';
      }
    } else if (ageYears <= 9) {
      if (bmiDiff < -2.5) {
        fitValue = 'Kids M (Anak 6-7 th)';
        label = 'Anak 8-9 th Slim (Kids M)';
        badgeText = 'Kids M';
      } else if (bmiDiff <= 2.5) {
        fitValue = 'Kids L (Anak 8-9 th)';
        label = 'Standar Anak 8-9 th (Kids L)';
        badgeText = 'Kids L';
      } else {
        fitValue = 'Kids XL (Anak 10-11 th)';
        label = 'Anak 8-9 th Berisi (Kids XL)';
        badgeText = 'Kids XL';
      }
    } else {
      if (bmiDiff < -2.5) {
        fitValue = 'Kids L (Anak 8-9 th)';
        label = 'Anak 10-11 th Slim (Kids L)';
        badgeText = 'Kids L';
      } else {
        fitValue = 'Kids XL (Anak 10-11 th)';
        label = 'Standar Anak 10-11 th (Kids XL)';
        badgeText = 'Kids XL';
      }
    }
  }
  // Stratum 3: Remaja, Dewasa & Lansia (12+ Tahun) -> Adult Apparel Line
  else {
    if (bmi < 16.5) {
      fitValue = 'Adult XS (Sangat Kecil / Slim)';
      label = `Sangat Kurus (BMI ${bmi})`;
      badgeText = 'Adult XS';
    } else if (bmi < 18.5) {
      fitValue = 'Adult S (Kecil / Fit)';
      label = `Slim Fit (BMI ${bmi})`;
      badgeText = 'Adult S';
    } else if (bmi <= 22.9) {
      fitValue = 'Adult M (Sedang / Regular Fit)';
      label = `Dewasa Ideal (BMI ${bmi})`;
      badgeText = 'Adult M';
    } else if (bmi <= 25.4) {
      fitValue = 'Adult L (Besar / Pas Longgar)';
      label = `Pas Longgar (BMI ${bmi})`;
      badgeText = 'Adult L';
    } else if (bmi <= 27.9) {
      fitValue = 'Adult XL (Extra Besar / Loose)';
      label = `Extra Large (BMI ${bmi})`;
      badgeText = 'Adult XL';
    } else if (bmi <= 31.9) {
      fitValue = 'Adult XXL (Jumbo / Big Size)';
      label = `Jumbo 2XL (BMI ${bmi})`;
      badgeText = 'Adult XXL';
    } else {
      fitValue = 'Adult XXXL (Super Jumbo)';
      label = `Super Jumbo 3XL (BMI ${bmi})`;
      badgeText = 'Adult XXXL';
    }
  }

  return { fitValue, bmi, label, badgeText };
}

function updateFitRecommendationUI(heightCm, weightKg, ageNum, genderStr) {
  renderClothingSizeOptions(ageNum);

  const recommendation = calculateAgeStratifiedFit(heightCm, weightKg, ageNum, genderStr);
  const badgeEl = document.getElementById('fitRecommendationBadge');
  if (badgeEl) {
    badgeEl.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-amber-500 mr-1"></i> Rekomendasi AI: <strong>${recommendation.badgeText}</strong> <span class="opacity-75 font-normal">(${recommendation.label})</span>`;
  }

  const radios = document.querySelectorAll('input[name="clothingFit"]');
  let matched = false;
  radios.forEach(radio => {
    if (radio.value === recommendation.fitValue) {
      radio.checked = true;
      matched = true;
    }
  });

  if (!matched && radios.length > 0) {
    radios[0].checked = true;
  }
}

// Initialize Upload Area & Form Handlers
function initApp() {
  renderUploadGrid();
  const ageEl = document.getElementById('modelAge');
  if (ageEl) {
    onAgeInputChange(ageEl);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
window.onload = initApp;

// Helper for Age Category Calculation
// Helper for Age Category Calculation (Supports Tahun & Bulan)
function calculateAgeCategory(ageNum, unitStr = currentAgeUnit) {
  const age = parseInt(ageNum, 10);
  if (isNaN(age) || age < 0) {
    return { id: 'dewasa', name: 'Dewasa', range: '18-59 th' };
  }

  if (unitStr === 'Bulan') {
    if (age <= 23) {
      return { id: 'bayi', name: 'Bayi', range: `${age} bln` };
    } else if (age <= 60) {
      const yrs = Math.floor(age / 12);
      return { id: 'balita', name: 'Balita', range: `${yrs} th (${age} bln)` };
    } else {
      const yrs = Math.floor(age / 12);
      return calculateAgeCategory(yrs, 'Tahun');
    }
  } else {
    if (age <= 1) {
      return { id: 'bayi', name: 'Bayi', range: '0-1 th' };
    } else if (age <= 5) {
      return { id: 'balita', name: 'Balita', range: '2-5 th' };
    } else if (age <= 11) {
      return { id: 'anak-anak', name: 'Anak-anak', range: '6-11 th' };
    } else if (age <= 17) {
      return { id: 'remaja', name: 'Remaja', range: '12-17 th' };
    } else if (age <= 59) {
      return { id: 'dewasa', name: 'Dewasa', range: '18-59 th' };
    } else {
      return { id: 'lansia', name: 'Lansia', range: '≥60 th' };
    }
  }
}

function updateAgeCategoryPills(categoryInfo) {
  const container = document.getElementById('ageCategoryContainer');
  const label = document.getElementById('ageCategoryLabel');
  if (label) {
    label.innerText = `${categoryInfo.name} (${categoryInfo.range})`;
  }
  if (!container) return;

  const pills = container.querySelectorAll('[data-category]');
  pills.forEach(pill => {
    const cat = pill.getAttribute('data-category');
    if (cat === categoryInfo.id) {
      pill.className = "age-pill flex-1 min-w-[45px] py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all duration-300 bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200 ring-2 ring-teal-400/30";
    } else {
      pill.className = "age-pill flex-1 min-w-[45px] py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all duration-300 bg-white text-slate-400 border-slate-200 opacity-60";
    }
  });
}

function getSelectedGender() {
  const checked = document.querySelector('input[name="gender"]:checked');
  return checked ? checked.value : 'Laki-laki';
}

function onAgeInputChange(el) {
  let val = el ? el.value : '';
  let num = parseInt(val, 10);
  if (isNaN(num) || num < 0) {
    num = 0;
  }
  const categoryInfo = calculateAgeCategory(num, currentAgeUnit);
  updateAgeCategoryPills(categoryInfo);

  // Update default TB & BB per exact age and unit
  const gender = getSelectedGender();
  const metrics = getStandardMetricsForAge(num, gender, currentAgeUnit);

  const hEl = document.getElementById('modelHeight');
  const wEl = document.getElementById('modelWeight');
  const hText = document.getElementById('heightHelperText');
  const wText = document.getElementById('weightHelperText');

  if (hEl) hEl.value = metrics.height;
  if (wEl) wEl.value = metrics.weight;
  if (hText) hText.innerText = `Rata-rata: ${metrics.height} cm`;
  if (wText) wText.innerText = `Rata-rata: ${metrics.weight} kg`;

  updateFitRecommendationUI(metrics.height, metrics.weight, num, gender);
}

function onMetricsInputChange() {
  const ageData = getModelAgeData();
  const gender = getSelectedGender();
  const hEl = document.getElementById('modelHeight');
  const wEl = document.getElementById('modelWeight');

  const height = hEl ? (parseFloat(hEl.value) || 168) : 168;
  const weight = wEl ? (parseFloat(wEl.value) || 64) : 64;

  updateFitRecommendationUI(height, weight, ageData.age, gender);
}

function getModelMetrics() {
  const hEl = document.getElementById('modelHeight');
  const wEl = document.getElementById('modelWeight');
  const height = hEl ? (parseFloat(hEl.value) || 168) : 168;
  const weight = wEl ? (parseFloat(wEl.value) || 64) : 64;
  return { height, weight };
}

function setQuickAge(age, unitStr = null) {
  if (unitStr && unitStr !== currentAgeUnit) {
    setAgeUnit(unitStr);
  }
  const ageEl = document.getElementById('modelAge');
  if (ageEl) {
    ageEl.value = age;
    onAgeInputChange(ageEl);
    if (window.showToast) {
      const info = calculateAgeCategory(age, currentAgeUnit);
      showToast(`Usia diubah ke ${age} ${currentAgeUnit} (${info.name})`, 'info', 'Pengaturan Usia');
    }
  }
}

function getModelAgeData() {
  const ageEl = document.getElementById('modelAge');
  let age = ageEl ? parseInt(ageEl.value, 10) : 25;
  if (isNaN(age) || age < 0) age = 25;
  const categoryInfo = calculateAgeCategory(age, currentAgeUnit);
  const ageYears = currentAgeUnit === 'Bulan' ? (age / 12) : age;
  return {
    age: age,
    unit: currentAgeUnit,
    ageYears: ageYears,
    displayString: `${age} ${currentAgeUnit}`,
    categoryName: categoryInfo.name,
    categoryRange: categoryInfo.range
  };
}

function onGenderChange(el) {
  if (window.showToast) {
    showToast(`Model diubah ke: ${el.value}`, 'info', 'Pengaturan Model');
  }
  const ageEl = document.getElementById('modelAge');
  if (ageEl) {
    onAgeInputChange(ageEl);
  }
}

function onStyleChange(el) {
  if (window.showToast) {
    const text = el.options[el.selectedIndex].text;
    showToast(`Latar studio diubah ke: ${text}`, 'info', 'Setting Latar');
  }
}

function onFitChange(el) {
  if (window.showToast) {
    showToast(`Ukuran pakaian diubah ke: ${el.value}`, 'info', 'Ukuran Pakaian');
  }
}

function getClothingFit() {
  const checked = document.querySelector('input[name="clothingFit"]:checked');
  return checked ? checked.value : 'Ukuran M (Sedang / Regular Fit)';
}

function renderUploadGrid() {
  const container = document.getElementById('uploadGrid');
  const countText = document.getElementById('uploadedCountText');
  if (!container) return;

  container.innerHTML = '';
  const hasImg = uploadedImage !== null;

  if (hasImg) {
    countText.className = "text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200 flex items-center gap-1";
    countText.innerHTML = `<i class="fa-solid fa-circle-check text-[10px]"></i> 1 / 1 Terisi`;
  } else {
    countText.className = "text-xs text-teal-700 bg-teal-50 px-3 py-1 rounded-full font-bold border border-teal-100 flex items-center gap-1";
    countText.innerHTML = `<i class="fa-regular fa-circle text-[10px]"></i> Belum Ada Gambar`;
  }

  const slotHTML = `
    <div class="relative border-2 border-dashed ${hasImg ? 'border-teal-500 bg-teal-50/20' : 'border-slate-300 hover:border-teal-400 bg-slate-50 hover:bg-slate-100/80'} rounded-3xl p-4 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] cursor-pointer transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-md">
      <input type="file" id="fileInput" accept="image/*" class="hidden" onchange="handleFileSelect(event)">
      
      ${hasImg ? `
        <div class="relative w-full h-full max-h-[240px] flex items-center justify-center overflow-hidden rounded-2xl">
          <img src="${uploadedImage.value}" class="w-full h-48 sm:h-56 object-contain rounded-2xl shadow-sm">
          <div class="absolute top-2 right-2 flex gap-2">
            <button onclick="showUrlInput(event)" class="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-teal-500 text-slate-700 hover:text-white rounded-full flex items-center justify-center text-xs shadow-md transition-colors" title="Ganti dengan URL">
              <i class="fa-solid fa-link"></i>
            </button>
            <button onclick="triggerFileInput()" class="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-teal-500 text-slate-700 hover:text-white rounded-full flex items-center justify-center text-xs shadow-md transition-colors" title="Ganti dengan File">
              <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
            <button onclick="removeImage(event)" class="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-red-500 text-slate-700 hover:text-white rounded-full flex items-center justify-center text-xs shadow-md transition-colors" title="Hapus">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      ` : `
        <div class="flex flex-col items-center text-slate-400 group-hover:text-teal-600 transition-colors w-full text-center py-4" onclick="showSlotOptions(event)">
          <div class="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 border border-slate-200 group-hover:border-teal-300 group-hover:scale-105 transition-all">
            <i class="fa-solid fa-cloud-arrow-up text-2xl text-teal-600"></i>
          </div>
          <span class="text-sm font-bold text-slate-700 group-hover:text-teal-700 mb-1">Unggah Gambar Produk</span>
          <span class="text-xs text-slate-400 max-w-xs">Klik di sini untuk memilih file dari perangkat atau link URL</span>
        </div>
      `}
    </div>
    
    <!-- Options Menu Modal -->
    <div id="slotOptionsModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
            <i class="fa-solid fa-image text-teal-600"></i>
            Pilih Sumber Gambar
          </h3>
          <button onclick="closeSlotOptions()" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        
        <button onclick="triggerFileInput(); closeSlotOptions();" class="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-300 rounded-2xl transition-all group cursor-pointer">
          <div class="w-12 h-12 rounded-2xl bg-teal-100 group-hover:bg-teal-200 flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-upload text-teal-600 text-lg"></i>
          </div>
          <div class="text-left flex-1">
            <div class="font-bold text-slate-900 text-sm">Upload dari File</div>
            <div class="text-xs text-slate-500">Pilih gambar dari perangkat Anda</div>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-400 group-hover:text-teal-600"></i>
        </button>
        
        <button onclick="showUrlInputFromOptions(event)" class="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 rounded-2xl transition-all group cursor-pointer">
          <div class="w-12 h-12 rounded-2xl bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-link text-indigo-600 text-lg"></i>
          </div>
          <div class="text-left flex-1">
            <div class="font-bold text-slate-900 text-sm">Dari URL Gambar</div>
            <div class="text-xs text-slate-500">Masukkan link gambar produk</div>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-400 group-hover:text-indigo-600"></i>
        </button>
      </div>
    </div>
    
    <!-- URL Input Modal -->
    <div id="urlInputModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
            <i class="fa-solid fa-link text-teal-600"></i>
            Masukkan URL Gambar
          </h3>
          <button onclick="closeUrlInput()" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <p class="text-xs text-slate-500">Masukkan link URL publik gambar produk (contoh: https://example.com/produk.jpg)</p>
        <input type="url" id="urlInput" placeholder="https://example.com/produk.jpg" class="w-full bg-white border-2 border-slate-200 p-3.5 rounded-xl text-sm font-mono focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all">
        <div class="flex gap-2 pt-2">
          <button onclick="closeUrlInput()" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer">
            Batal
          </button>
          <button onclick="loadImageFromUrl()" class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-3 rounded-xl text-sm transition-colors shadow-md shadow-teal-200 cursor-pointer">
            <i class="fa-solid fa-check mr-1"></i> Muat Gambar
          </button>
        </div>
      </div>
    </div>
  `;
  container.innerHTML = slotHTML;
}

function triggerFileInput() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      if (window.showAlertModal) {
        showAlertModal({
          title: 'Ukuran File Terlalu Besar',
          message: 'Ukuran file gambar tidak boleh melebihi 5MB. Silakan kompres atau pilih gambar berukuran lebih kecil.',
          type: 'warning',
          confirmText: 'Paham'
        });
      }
      showToast("Ukuran file maksimal 5MB!", "warning", "File Terlalu Besar");
      return;
    }

    showUploadLoading(true);

    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImage = { type: 'base64', value: e.target.result, name: file.name };
      renderUploadGrid();
      showToast(`Gambar "${file.name}" berhasil diunggah!`, "success", "Unggah Berhasil");
    };
    reader.onerror = function () {
      showUploadLoading(false);
      showToast("Gagal membaca file gambar. Silakan coba lagi.", "error", "Gagal Upload");
    };
    reader.readAsDataURL(file);
  }
}

function showUploadLoading(show) {
  const container = document.getElementById('uploadGrid');
  if (!container) return;

  if (show) {
    container.innerHTML = `
      <div class="border-2 border-dashed border-teal-500 bg-teal-50/20 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[220px]">
        <div class="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span class="text-sm text-teal-600 font-bold">Mengunggah Gambar...</span>
      </div>
    `;
  }
}

function removeImage(event) {
  if (event) event.stopPropagation();

  if (window.showAlertModal) {
    showAlertModal({
      title: 'Hapus Gambar Produk?',
      message: 'Apakah Anda yakin ingin menghapus gambar produk yang sudah diunggah?',
      type: 'warning',
      confirmText: 'Ya, Hapus',
      cancelText: 'Batal',
      onConfirm: () => {
        uploadedImage = null;
        renderUploadGrid();
        showToast("Gambar produk berhasil dihapus.", "info", "Gambar Dihapus");
      }
    });
  } else {
    uploadedImage = null;
    renderUploadGrid();
    showToast("Gambar produk berhasil dihapus.", "info", "Gambar Dihapus");
  }
}

function showSlotOptions(event) {
  if (event) event.stopPropagation();
  const modal = document.getElementById('slotOptionsModal');
  if (modal) modal.classList.remove('hidden');
}

function closeSlotOptions() {
  const modal = document.getElementById('slotOptionsModal');
  if (modal) modal.classList.add('hidden');
}

function showUrlInput(event) {
  if (event) event.stopPropagation();
  closeSlotOptions();
  const modal = document.getElementById('urlInputModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.getElementById('urlInput').focus();
  }
}

function showUrlInputFromOptions(event) {
  if (event) event.stopPropagation();
  closeSlotOptions();
  const modal = document.getElementById('urlInputModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.getElementById('urlInput').focus();
  }
}

function closeUrlInput() {
  const modal = document.getElementById('urlInputModal');
  if (modal) {
    modal.classList.add('hidden');
    document.getElementById('urlInput').value = '';
  }
}

async function loadImageFromUrl() {
  const urlInput = document.getElementById('urlInput');
  const imageUrl = urlInput.value.trim();

  if (!imageUrl) {
    showToast("Masukkan URL gambar yang valid!", "warning", "URL Kosong");
    return;
  }

  try {
    new URL(imageUrl);
  } catch (e) {
    showToast("Format URL tidak valid! Contoh: https://example.com/gambar.jpg", "error", "URL Invalid");
    return;
  }

  uploadedImage = { type: 'url', value: imageUrl };
  renderUploadGrid();
  closeUrlInput();
  showToast("Gambar produk berhasil dimuat dari URL!", "success", "URL Dimuat");
}

async function generateAllMockups() {
  if (!uploadedImage) {
    if (window.showAlertModal) {
      showAlertModal({
        title: 'Belum Ada Gambar Produk',
        message: 'Silakan unggah 1 foto produk terlebih dahulu sebelum men-generate mockup AI.',
        type: 'warning',
        confirmText: 'Unggah Gambar Sekarang',
        onConfirm: () => triggerFileInput()
      });
    }
    showToast("Unggah 1 gambar produk terlebih dahulu!", "warning", "Perhatian");
    return;
  }

  const gender = document.querySelector('input[name="gender"]:checked').value;
  const studioStyle = document.getElementById('studioStyle').value;
  const ageData = getModelAgeData();
  const ageDisplay = ageData.displayString;
  const ageCategory = ageData.categoryName;
  const clothingFit = getClothingFit();
  const { height, weight } = getModelMetrics();

  showToast("Memproses gambar & caption AI...", "info", "Memproses");
  setLoadingState(true);

  let tryOnImg = null;
  let captionText = null;

  // Task 1: Generate Image (Paralel)
  const imageTask = (async () => {
    try {
      showToast("Membuat gambar fashion...", "info", "Gambar AI");
      const imgResult = await generateImageAi(uploadedImage, gender, studioStyle, ageDisplay, ageCategory, clothingFit, height, weight);
      if (imgResult) {
        tryOnImg = imgResult;
        document.getElementById('tryOnPlaceholder').classList.add('hidden');
        const imgEl = document.getElementById('imgTryOn');
        imgEl.src = tryOnImg;
        imgEl.classList.remove('hidden');
        const downloadBtn = document.getElementById('btnDownloadTryOn');
        if (downloadBtn) downloadBtn.href = tryOnImg;
        document.getElementById('overlayTryOn').classList.remove('hidden');
        showToast("Gambar berhasil dibuat!", "success", "Gambar AI");
      } else {
        throw new Error('Server mengembalikan gambar kosong');
      }
    } catch (imgErr) {
      console.error('Image Gen Failed:', imgErr);
      const imgErrMsg = extractErrorMessage(imgErr);
      const placeholder = document.getElementById('tryOnPlaceholder');
      placeholder.innerHTML = `
        <div class="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-3 text-rose-500">
          <i class="fa-solid fa-triangle-exclamation text-2xl"></i>
        </div>
        <span class="text-xs font-semibold text-rose-500">Gagal membuat gambar AI.</span>
        <span class="text-[10px] text-slate-400 mt-1">${imgErrMsg}</span>
      `;
      placeholder.classList.remove('hidden');
      showToast(`Gagal membuat gambar: ${imgErrMsg}`, "error", "Gagal Gambar", 5000);
    }
  })();

  // Task 2: Analyze Product & Generate Caption (Paralel)
  const captionTask = (async () => {
    let productJson = null;
    const imageForAnalysis = uploadedImage
      ? (uploadedImage.type === 'base64' ? uploadedImage.value : uploadedImage.value)
      : null;

    if (imageForAnalysis) {
      try {
        showToast("Menganalisis produk...", "info", "Analisis Produk");
        productJson = await analyzeImageWithVision(imageForAnalysis, gender, studioStyle);
        productJson = enrichProductJson(productJson);
      } catch (visionErr) {
        console.error('Vision Analysis Failed:', visionErr);
        const visionErrMsg = extractErrorMessage(visionErr);
        showToast(`Analisis visual terkendala, menyusun caption...`, "warning", "Analisis Produk", 4000);
      }
    }

    try {
      showToast("Menyusun caption Instagram...", "info", "Caption AI");
      captionText = await generateCaptionAi(productJson, gender, studioStyle, ageDisplay, ageCategory, clothingFit, height, weight);

      if (captionText) {
        const capContainer = document.getElementById('captionContainer');
        const capText = document.getElementById('captionText');
        const capBtn = document.getElementById('btnCopyCaption');
        const badge = document.getElementById('captionStatusBadge');
        const instruction = document.getElementById('captionInstruction');

        capContainer.classList.remove('opacity-70');
        capText.disabled = false;
        capText.value = captionText;
        capText.className = "w-full bg-white p-4 rounded-xl border border-teal-100/80 shadow-inner text-xs sm:text-sm text-slate-700 font-sans focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed resize-y";
        capBtn.disabled = false;
        capBtn.className = "text-xs font-bold text-teal-600 bg-white hover:bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer";
        badge.className = "text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1";
        badge.innerHTML = `<i class="fa-solid fa-lock-open text-[9px]"></i> Siap Diedit`;
        instruction.innerText = "Silakan edit teks di bawah ini jika ingin menyesuaikan harga, promo, atau pesan khusus:";
        showToast("Caption berhasil dibuat!", "success", "Caption AI");
      } else {
        throw new Error('Server mengembalikan caption kosong');
      }
    } catch (capErr) {
      console.error('Caption Gen Failed:', capErr);
      const capErrMsg = extractErrorMessage(capErr);
      const capText = document.getElementById('captionText');
      if (capText) capText.value = `Gagal membuat caption AI.\n\nDetail: ${capErrMsg}`;
      showToast(`Gagal membuat caption: ${capErrMsg}`, "error", "Gagal Caption", 5000);
    }
  })();

  // Jalankan pembuatan gambar & caption secara BERSAMAAN (PARALEL)
  await Promise.allSettled([imageTask, captionTask]);

  // FINAL Feedback
  const bothDone = tryOnImg && captionText;
  const partialDone = tryOnImg || captionText;

  if (bothDone) {
    showToast("Gambar & Caption berhasil dibuat!", "success", "Selesai");
  } else if (partialDone) {
    showToast(tryOnImg ? "Gambar berhasil, caption terkendala." : "Caption berhasil, gambar terkendala.", "warning", "Parsial Selesai");
  } else {
    showToast("Semua proses AI terkendala. Silakan coba lagi.", "error", "Gagal");
  }

  setLoadingState(false);
}

//  STEP 1: Cloudflare Flux 2 Klein 4B  Image Generation 
async function generateImageAi(image, gender, style, age = 25, ageCategory = 'Dewasa', clothingFit = 'Ukuran M (Sedang / Regular Fit)', height = 168, weight = 64) {
  const apiUrl = `/api/proxy?action=cloudflare-image`;

  const promptText = `You are a professional luxury fashion photographer and commercial product stylist.

The uploaded image is the ONLY product reference.

Your task is to generate a photorealistic commercial fashion image featuring an AI-generated human model naturally wearing, holding, or using the exact product from the reference image.

The product is the hero of the image.

========================================
PRODUCT PRESERVATION (HIGHEST PRIORITY)
========================================

Preserve the uploaded product as accurately as possible.

Do NOT change:
- Product type
- Shape
- Size
- Colors
- Logo
- Branding
- Graphics
- Print
- Pattern
- Fabric
- Stitching
- Materials
- Accessories attached to the product
- Surface texture
- Design details

Never redesign or replace the product.

The product must remain visually identical to the reference image.

========================================
COMPOSITION RULES
========================================

Automatically choose the camera framing based on the product category.

If the product is:

 T-Shirt
 Hoodie
 Jacket
 Sweater
 Polo
 Jersey
 Blazer
 Shirt
 Coat

 Generate an upper-body or half-body fashion portrait.

The clothing must be fully visible and become the primary focus.

The model's face may be visible but should never dominate the composition.

----------------------------------------

If the product is:

 Pants
 Jeans
 Shorts
 Skirt
 Leggings

 Generate a lower-body fashion shot.

Focus on the waist, hips, and legs.

The pants must be completely visible.

----------------------------------------

If the product is:

 Shoes
 Sneakers
 Sandals
 Boots
 High Heels

 Generate a close-up lifestyle shot focusing on the feet.

The footwear must occupy most of the frame.

Natural standing or walking poses.

----------------------------------------

If the product is:

 Hat
 Cap
 Beanie
 Helmet

 Generate a portrait focusing on the head and upper body.

The headwear must be the primary subject.

----------------------------------------

If the product is:

 Sunglasses
 Glasses

 Generate a portrait emphasizing the face and eyewear.

The glasses must remain clearly visible.

----------------------------------------

If the product is:

 Earrings
 Necklace
 Bracelet
 Watch
 Ring

 Generate a close-up lifestyle portrait emphasizing the accessory.

Keep the accessory as the visual focus.

----------------------------------------

If the product is:

 Backpack

 Generate a lifestyle shot showing the model naturally wearing the backpack.

Prefer rear three-quarter angle or side angle so the backpack is clearly visible.

----------------------------------------

If the product is:

 Handbag
 Shoulder Bag
 Tote Bag

 Generate a fashion pose naturally holding or wearing the bag.

Focus on the arm, shoulder, and bag.

----------------------------------------

If the product is:

 Sling Bag
 Waist Bag
 Belt Bag

 Generate a waist-up or full-body shot emphasizing the bag placement.

----------------------------------------

If the product category cannot be determined,

choose the camera composition that best highlights the uploaded product while keeping it as the primary focus.

========================================
MODEL
========================================

Generate a realistic human model.

Natural body proportions.

Natural pose.

Relaxed expression.

Professional fashion posture.

Modern commercial fashion photography.

Model gender: ${gender}.

Model age: ${age} years old (${ageCategory}).

Model physical height: ${height} cm, weight: ${weight} kg.

Clothing fit style: ${clothingFit}.

Ensure the AI model visually matches a ${ageCategory.toLowerCase()} model aged approximately ${age} years old with physical proportions of ${height} cm height and ${weight} kg weight, naturally styled wearing the item in a ${clothingFit} fit.

========================================
PHOTOGRAPHY
========================================

Luxury fashion campaign.

Professional studio lighting.

Soft shadows.

Premium e-commerce quality.

Photorealistic.

High detail.

Natural skin texture.

Natural fabric folds.

Sharp focus.

Clean composition.

Luxury aesthetic.

Magazine-quality fashion photography.

Background setting: ${style}.

========================================
IMPORTANT
========================================

The generated person is only a model.

The uploaded product is the main subject.

Never crop important parts of the product.

Always ensure the entire product remains clearly visible.

The viewer should immediately recognize the uploaded product as the focus of the image.

Output a single ultra-realistic commercial fashion image.`;

  const payload = { prompt: promptText };

  if (image.type === 'base64') {
    const val = image.value;
    payload.image_b64 = val.includes(',') ? val.split(',')[1] : val;
  } else if (image.type === 'url') {
    payload.image_url = image.value;
  }

  return await fetchWithRetry(apiUrl, payload, (result) => {
    if (result && result.resultImage) return result.resultImage;
    if (result && result.result && result.result.image) return `data:image/png;base64,${result.result.image}`;
    return null;
  });
}

//  Enrichment Layer: JavaScript yang pintar menambah context dari data deterministik
function enrichProductJson(json) {
  if (!json || typeof json !== 'object') return json;

  const raw = (json.type || '').toLowerCase().trim();
  if (!raw) return json;

  // Normalisasi type ke nama standar
  const typeMap = {
    't-shirt': 'T-Shirt', 'tshirt': 'T-Shirt', 'kaos': 'T-Shirt',
    'hoodie': 'Hoodie',
    'jacket': 'Jacket', 'jaket': 'Jacket',
    'sweater': 'Sweater',
    'polo': 'Polo Shirt',
    'jersey': 'Jersey',
    'blazer': 'Blazer',
    'shirt': 'Shirt', 'kemeja': 'Shirt',
    'coat': 'Coat',
    'pants': 'Pants', 'celana panjang': 'Pants', 'trousers': 'Pants',
    'jeans': 'Jeans',
    'shorts': 'Shorts', 'celana pendek': 'Shorts',
    'skirt': 'Skirt', 'rok': 'Skirt',
    'leggings': 'Leggings',
    'dress': 'Dress', 'gaun': 'Dress',
    'jumpsuit': 'Jumpsuit',
    'shoes': 'Shoes', 'sepatu': 'Shoes',
    'sneakers': 'Sneakers',
    'sandals': 'Sandals', 'sandal': 'Sandals',
    'boots': 'Boots',
    'heels': 'Heels', 'high heels': 'Heels',
    'hat': 'Hat', 'topi': 'Hat',
    'cap': 'Cap',
    'beanie': 'Beanie',
    'sunglasses': 'Sunglasses', 'kacamata hitam': 'Sunglasses',
    'glasses': 'Glasses', 'kacamata': 'Glasses',
    'earrings': 'Earrings', 'anting': 'Earrings',
    'necklace': 'Necklace', 'kalung': 'Necklace',
    'bracelet': 'Bracelet', 'gelang': 'Bracelet',
    'watch': 'Watch', 'jam tangan': 'Watch',
    'ring': 'Ring', 'cincin': 'Ring',
    'backpack': 'Backpack', 'ransel': 'Backpack',
    'handbag': 'Handbag', 'tas tangan': 'Handbag',
    'tote bag': 'Tote Bag', 'totebag': 'Tote Bag',
    'sling bag': 'Sling Bag', 'tas selempang': 'Sling Bag',
    'waist bag': 'Waist Bag', 'belt bag': 'Waist Bag', 'tas pinggang': 'Waist Bag',
    'bag': 'Bag', 'tas': 'Bag',
  };

  // Cari match terpanjang dulu (untuk "sling bag" sebelum "bag")
  let normalizedType = json.type;
  let matched = '';
  for (const [key, val] of Object.entries(typeMap)) {
    if (raw.includes(key) && key.length > matched.length) {
      normalizedType = val;
      matched = key;
    }
  }
  json.type = normalizedType;

  // Mapping body_area per kategori  JavaScript yang menentukan, bukan AI
  const bodyAreaMap = {
    'T-Shirt': 'upper body', 'Hoodie': 'upper body', 'Jacket': 'upper body',
    'Sweater': 'upper body', 'Polo Shirt': 'upper body', 'Jersey': 'upper body',
    'Blazer': 'upper body', 'Shirt': 'upper body', 'Coat': 'upper body',
    'Pants': 'lower body', 'Jeans': 'lower body', 'Shorts': 'lower body',
    'Skirt': 'lower body', 'Leggings': 'lower body',
    'Dress': 'full body', 'Jumpsuit': 'full body',
    'Shoes': 'feet', 'Sneakers': 'feet', 'Sandals': 'feet',
    'Boots': 'feet', 'Heels': 'feet',
    'Hat': 'head', 'Cap': 'head', 'Beanie': 'head',
    'Sunglasses': 'face', 'Glasses': 'face',
    'Earrings': 'ears', 'Necklace': 'neck', 'Bracelet': 'wrist',
    'Watch': 'wrist', 'Ring': 'finger',
    'Backpack': 'back', 'Handbag': 'hand', 'Tote Bag': 'hand',
    'Sling Bag': 'shoulder', 'Waist Bag': 'waist', 'Bag': 'hand',
  };

  json.body_area = bodyAreaMap[json.type] || 'body';
  return json;
}

//  STEP 2: Cloudflare Llama 3.2 11B Vision  Product Recognition 
// ── Helper: ekstrak JSON object pertama yang valid dari teks respons ──────────
function extractFirstValidJson(text) {
  if (!text) return null;
  let depth = 0;
  let start = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (text[i] === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        try {
          return JSON.parse(text.substring(start, i + 1));
        } catch (_) {
          start = -1; // JSON tidak valid, cari pembuka berikutnya
        }
      }
    }
  }
  return null;
}

// ── STEP 2: Cloudflare Llama 3.2 11B Vision — Single-call pipeline ──────────────
async function analyzeImageWithVision(imageDataUrl, gender, style) {
  const imagePayload = {};
  if (imageDataUrl.startsWith('data:')) {
    imagePayload.image_b64 = imageDataUrl.includes(',') ? imageDataUrl.split(',')[1] : imageDataUrl;
  } else {
    imagePayload.image_url = imageDataUrl;
  }

  const visionPrompt = `You are a product recognition AI model.

Identify the SINGLE fashion product in this image and analyze its key attributes.

Choose the "type" field EXACTLY from this list:
T-Shirt, Hoodie, Jacket, Sweater, Polo, Blazer, Shirt, Coat, Pants, Jeans, Shorts, Skirt, Leggings, Dress, Jumpsuit, Shoes, Sneakers, Sandals, Boots, Heels, Hat, Cap, Beanie, Sunglasses, Glasses, Earrings, Necklace, Bracelet, Watch, Ring, Backpack, Handbag, Tote Bag, Sling Bag, Waist Bag, Bag, Other

Return ONLY a single valid JSON object. No markdown code blocks. No explanation. No extra text.

{
  "type": "exact value from the list above",
  "category": "apparel or footwear or accessory or bag",
  "primary_color": "",
  "secondary_colors": [],
  "material": "",
  "style": "",
  "key_features": [],
  "confidence": 0.9
}`;

  const payload = { prompt: visionPrompt, ...imagePayload };

  const result = await fetchWithRetry(
    `/api/proxy?action=cloudflare-vision`,
    payload,
    (r) => {
      const text = r?.analysis || r?.text || '';

      if (typeof text === 'object' && text !== null) {
        return text;
      }

      if (!text || typeof text !== 'string') return { type: "Other", confidence: 0.5 };

      const parsed = extractFirstValidJson(text);
      if (parsed) return parsed;

      // Fallback jika Vision mengembalikan teks biasa tanpa JSON format
      const strVal = String(text).trim();
      return {
        type: strVal.substring(0, 50) || "Other",
        raw_text: strVal,
        confidence: 0.5
      };
    }
  );

  return result;
}

// Helper: Tentukan kategori umur berdasarkan angka
function getAgeCategory(age) {
  if (age < 13) return 'Anak-anak';
  if (age < 20) return 'Remaja';
  if (age < 40) return 'Dewasa Muda';
  if (age < 60) return 'Dewasa';
  return 'Senior';
}

// ── STEP 3: Groq — Caption Generation (token-optimized) ─────────────────────
async function generateCaptionAi(productJson, gender, style, age = 25, ageCategory = 'Dewasa', clothingFit = 'Ukuran M (Sedang / Regular Fit)', height = 168, weight = 64) {
  const apiUrl = `/api/proxy?action=groq-caption`;

  const productDescription = productJson
    ? (typeof productJson === 'object' ? JSON.stringify(productJson) : String(productJson))
    : `Produk fashion ${gender}, ${style}`;

  const promptText = `Tulis caption Instagram promosi fashion Indonesia yang membuat orang berhenti scroll, membayangkan memakai produknya, lalu terdorong membuka toko.

PRODUK:
${productDescription}

MODEL:
Jenis Kelamin: ${gender}
Umur Model: ${age} tahun (${ageCategory})
Tinggi Badan: ${height} cm
Berat Badan: ${weight} kg
Potongan / Fit Pakaian: ${clothingFit}

LATAR:
${style}

TARGET AUDIENS & NADA TEKS:
Sesuaikan gaya bahasa, penulisan, dan tone caption agar sangat relevan dengan kelompok usia ${ageCategory} (${age} tahun), postur model (${height}cm / ${weight}kg), serta potongan pakaian ${clothingFit}.

GUNAKAN PRINSIP COPYWRITING BERIKUT

1. HOOK
Kalimat pertama HARUS membuat orang berhenti scroll.
Gunakan salah satu:
- pertanyaan relatable
- rasa penasaran
- pernyataan yang bikin orang merasa "ini gue banget"

2. JUAL MANFAAT, BUKAN FITUR
Jangan menjelaskan spesifikasi.
Fokus pada bagaimana produk membuat pemakai terlihat atau merasa.

3. LIFESTYLE
Hubungkan produk dengan situasi nyata.
Misalnya:
- nongkrong
- ngopi
- kuliah
- kerja
- jalan sore
- weekend
- travelling

4. BANGUN EMOSI
Buat pembaca membayangkan dirinya memakai produk.
Gunakan nuansa:
- percaya diri
- effortless
- clean look
- santai
- stylish
- nyaman

5. CTA
Gunakan CTA ringan yang mendorong klik.
Misalnya:
- Cek detailnya di bio 👀
- Lihat koleksi lainnya yuk.
- DM kalau penasaran.
- Klik profil buat lihat lengkapnya.

6. HASHTAG
Maksimal 3 hashtag relevan.

VARIASI
Jangan memakai template yang sama setiap kali.
Variasikan pendekatan:
- Curiosity
- Storytelling
- FOMO ringan
- Confidence boost
- Relatable moment
- Humor ringan
- Minimalist aesthetic

====================
CONTOH 1

Masih bingung pilih outfit buat nongkrong nanti?
Kadang yang sederhana justru paling gampang bikin percaya diri tanpa banyak usaha.
Lihat detailnya di bio 👀
#ootd #fashionpria #nongkrong

====================
CONTOH 2

Pernah ngerasa outfit bagus tapi tetap kurang "klik"?
Kadang yang dicari bukan yang mencolok, tapi yang bikin nyaman jadi diri sendiri.
Klik profil buat lihat koleksinya ✨
#fashionwanita #ootd #dailylook

====================
CONTOH 3

Siapa bilang tampil rapi harus ribet?
Buat kuliah, kerja, atau ngopi sore, yang penting tetap kelihatan effortless.
DM kalau penasaran 😉
#casualstyle #ootd #fashion

====================
CONTOH 4

Outfit begini tuh bikin pengen keluar rumah terus.
Simple dipakai, enak dipandang, dan cocok buat momen santai sampai jalan malam.
Cek detailnya di bio 👀
#dailyoutfit #fashion #ootd

====================
CONTOH 5

Kalau disuruh pilih satu outfit buat dipakai berkali-kali, ini masuk kandidat nggak?
Kadang yang paling sering dipakai justru yang bikin nyaman dan percaya diri.
Klik profil buat lihat lengkapnya.
#fashionindonesia #ootd #style

====================

OUTPUT HANYA CAPTION.
Tidak ada label.
Tidak ada penjelasan.`;

  // Groq pakai format OpenAI-compatible messages[]
  const payload = {
    messages: [
      {
        role: 'user',
        content: promptText
      }
    ]
  };

  return await fetchWithRetry(apiUrl, payload, (result) => {
    return result?.choices?.[0]?.message?.content || null;
  }, 1);
}

// Helper: Ekstrak pesan error yang human-readable
function extractErrorMessage(err) {
  if (!err) return 'Terjadi kesalahan tidak dikenal.';
  const msg = err.message || String(err);

  // Tangkap status HTTP
  const statusMatch = msg.match(/HTTP Error status: (\d+)(.*)/);
  if (statusMatch) {
    const code = statusMatch[1];
    const detail = statusMatch[2] ? statusMatch[2].replace(/^\s*[-:]+\s*/, '') : '';
    const codeMap = {
      '400': 'Request tidak valid (400)',
      '401': 'Autentikasi gagal, periksa API token (401)',
      '403': 'Akses ditolak, periksa izin API token (403)',
      '404': 'Model tidak ditemukan (404)',
      '429': 'Kuota habis / Rate limit (429), coba lagi sebentar',
      '500': 'Server error internal (500)',
      '503': 'Server tidak tersedia sementara (503)'
    };
    const label = codeMap[code] || `Error ${code}`;
    return detail ? `${label}: ${detail}` : label;
  }

  // Truncate jika terlalu panjang
  return msg.length > 120 ? msg.slice(0, 120) + '...' : msg;
}

async function fetchWithRetry(url, payload, resultExtractor, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.status === 429) {
        let waitMs = 30000;
        try {
          const errData = await response.json();
          const retryDelaySec = errData?.error?.details
            ?.find(d => d.retryDelay)
            ?.retryDelay;
          if (retryDelaySec) {
            waitMs = parseFloat(retryDelaySec) * 1000;
          }
        } catch (_) { }

        console.warn(`Rate limited (429). Waiting ${Math.round(waitMs / 1000)}s...`);
        showToast(`Antrean server padat. Menunggu ${Math.round(waitMs / 1000)} detik...`, "warning", "Antrean Server");

        if (attempt === maxRetries) {
          throw new Error(`HTTP Error status: ${response.status} - quota exceeded`);
        }

        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }

      if (!response.ok) {
        let serverMsg = '';
        try {
          const errData = await response.json();
          // Ekstrak pesan error dari berbagai format respons
          serverMsg = errData?.error?.message
            || errData?.error
            || errData?.message
            || JSON.stringify(errData);
        } catch (_) {
          serverMsg = await response.text();
        }
        // Potong jika terlalu panjang
        if (typeof serverMsg === 'string' && serverMsg.length > 200) {
          serverMsg = serverMsg.slice(0, 200) + '...';
        }
        console.error('API Error Response:', serverMsg);
        throw new Error(`HTTP Error status: ${response.status} - ${serverMsg}`);
      }

      const data = await response.json();
      const extracted = resultExtractor(data);
      if (extracted) return extracted;

    } catch (e) {
      if (attempt === maxRetries) {
        throw e;
      }
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  return null;
}

function setLoadingState(isLoading) {
  const btn = document.getElementById('btnGenerate');
  if (!btn) return;

  if (isLoading) {
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-not-allowed');
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i><span>Sedang Memproses AI...</span>`;

    const loaderHTML = `
      <div class="flex flex-col items-center text-teal-600 animate-pulse p-4">
        <i class="fa-solid fa-wand-magic-sparkles text-3xl mb-3 text-teal-500"></i>
        <span class="text-xs font-bold text-slate-700">Generating AI Mockup...</span>
        <span class="text-[10px] text-slate-400 mt-1">Estimasi 5-10 detik</span>
      </div>
    `;

    document.getElementById('tryOnPlaceholder').innerHTML = loaderHTML;
    document.getElementById('tryOnPlaceholder').classList.remove('hidden');

    document.getElementById('imgTryOn').classList.add('hidden');
    document.getElementById('overlayTryOn').classList.add('hidden');

    document.getElementById('captionText').value = "Menganalisis produk & menyusun copywriting AI...";

  } else {
    btn.disabled = false;
    btn.classList.remove('opacity-70', 'cursor-not-allowed');
    btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-amber-300"></i><span>Generate Mockup & Caption</span>`;
  }
}

function copyCaption() {
  const captionInput = document.getElementById('captionText');
  const text = captionInput ? captionInput.value : '';
  if (!text) {
    showToast("Kolom caption masih kosong!", "warning", "Caption Kosong");
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast("Caption tersalin ke clipboard!", "success", "Berhasil Disalin");
  }).catch(() => {
    showToast("Gagal menyalin. Silakan salin manual.", "error", "Gagal Salin");
  });
}