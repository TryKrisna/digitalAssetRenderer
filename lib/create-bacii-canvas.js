import path from 'node:path'
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import _ from 'lodash';

export function registerFonts() {
  GlobalFonts.loadFontsFromDir(path.join(process.cwd(), 'assets', 'fonts'))
}

export async function createTemplateImage() {
  const templatePath = path.join(process.cwd(), "assets", "certificate-bacii-stamp.png");
  return loadImage(templatePath);
}

/**
 * 
 * @param {string} url 
 */
export async function loadRemoteResource(url) {
  try {
    const result = await loadImage(url);
    return result;
  } catch (e) {
    return null;
  }
}

export async function createBacIICanvas(certificateInfo = {}, qrcodeContent) {

  // this font names will be used across canvas
  const fontConfig = {
    primary: 'Khmer OS System',
    secondary: "Khmer OS Muol Light",
    arial: "Arial",
  }

  function font(name = fontConfig.primary, size = 20) {
    if (name === fontConfig.secondary) {
      return `${size}px ${name}, sans-serif`;
    }
    return `bold ${size}px ${name}, sans-serif`;
  }

  const colors = {
    blue: "#2f3699",
    black: "black",
    magenta: "#ff00ff",
    green: "#008000",
    red: "#ff0000"
  }

  // color for each grade
  const gradeColors = {
    "F": "#000000",
    "E": "#0000ff",
    "D": "#008000",
    "C": "#800000",
    "B": "#ff00ff",
    "A": "#ff0000"
  }

  const templateImage = await createTemplateImage();

  // canvas size is based on template's size
  const canvas = createCanvas(templateImage.width, templateImage.height);

  // draw background image
  const ctx = canvas.getContext('2d');
  ctx.drawImage(templateImage, 0, 0);

  // certificate number
  drawTexts(canvas, ctx, {
    y: 347,
    x: 251,
    gap: 14,
    align: "center"
  },
    {
      text: "លេខ",
      font: font(fontConfig.primary, 24),
      textColor: colors.blue,
    },
    {
      text: certificateInfo.id,
      font: font(fontConfig.primary, 24),
      textColor: colors.black,
    },
    {
      text: "កប្រឡ",
      font: font(fontConfig.primary, 24),
      textColor: colors.blue,
    }
  )

  // candidate name
  drawText(canvas, ctx, certificateInfo.name, {
    textColor: colors.magenta,
    font: font(fontConfig.secondary, 34),
    y: 611,
    x: 753,
    align: "center"
  })

  // candidate gender
  drawText(canvas, ctx, certificateInfo.gender, {
    textColor: colors.black,
    font: font(fontConfig.primary, 25),
    y: 612,
    x: 1080
  })

  // candidate date of birth
  drawText(canvas, ctx, certificateInfo.dateOfBirth, {
    textColor: colors.black,
    font: font(fontConfig.primary, 25),
    y: 675,
    x: 715,
    align: "center"
  })

  // candidate place of birth
  drawText(canvas, ctx, certificateInfo.placeOfBirth, {
    textColor: colors.black,
    font: font(fontConfig.primary, 25),
    y: 675,
    x: 909,
    align: "left"
  })

  // candidate father name
  drawText(canvas, ctx, certificateInfo.fatherName, {
    textColor: colors.black,
    font: font(fontConfig.primary, 25),
    y: 730,
    x: 662,
    align: "center"
  })

  // candidate mother name
  drawText(canvas, ctx, certificateInfo.motherName, {
    textColor: colors.black,
    font: font(fontConfig.primary, 25),
    y: 730,
    x: 1052,
    align: "center"
  })

  // exam date
  drawText(canvas, ctx, certificateInfo.examDate, {
    textColor: colors.green,
    font: font(fontConfig.secondary, 24),
    y: 844,
    x: 751,
    align: "left"
  })

  // exam center
  drawText(canvas, ctx, certificateInfo.centerName, {
    textColor: colors.green,
    font: font(fontConfig.secondary, 24),
    x: 950,
    y: 904,
    align: "left"
  })


  // exam program
  drawText(canvas, ctx, certificateInfo.program, {
    textColor: colors.black,
    font: font(fontConfig.secondary, 24),
    x: 486,
    y: 905,
    align: "left"
  });

  // exam information
  const textFontSize = 24;
  const valueFontSize = 28;

  drawTexts(canvas, ctx, {
    align: "left",
    gap: 14,
    x: 418,
    y: 970,
  },
    {
      text: "លេខបន្ទប់ ៖",
      font: font(fontConfig.primary, textFontSize),
      textColor: colors.black,
    },
    {
      text: certificateInfo.room,
      font: font(fontConfig.arial, valueFontSize, true),
      textColor: colors.green,
    },
    {
      text: "លេខតុ ៖",
      font: font(fontConfig.primary, textFontSize),
      textColor: colors.black,
    },

    {
      text: certificateInfo.seat,
      font: font(fontConfig.arial, valueFontSize, true),
      textColor: colors.green,
    },
    {
      text: "និទ្ទេសពិន្ទុសរុប៖",
      font: font(fontConfig.secondary, textFontSize),
      textColor: colors.black,
    },
    {
      text: certificateInfo.grade,
      font: font(fontConfig.arial, valueFontSize, true),
      textColor: gradeColors[certificateInfo.grade],
    },
    {
      text: "លំដាប់ពិន្ទុសរុប៖",
      font: font(fontConfig.secondary, textFontSize),
      textColor: colors.black,
    },
    {
      text: certificateInfo.rank,
      font: font(fontConfig.arial, valueFontSize, true),
      textColor: colors.red,
    },
  )

  // exam subjects
  const subjects = certificateInfo.grades;
  for (let i = 0; i < subjects.length + 2; i++) {
    if (i < 2) continue;
    const row = Math.floor(i / 3);
    const col = i % 3;
    const { id, grade } = subjects[i - 2];

    const gapX = 310 * col;
    const gapY = 53 * row;

    drawText(canvas, ctx, id, {
      textColor: colors.black,
      font: font(fontConfig.primary, 25),
      x: 424 + gapX,
      y: 1030 + gapY,
    });

    drawText(canvas, ctx, grade, {
      textColor: gradeColors[grade] || colors.black,
      font: font(fontConfig.arial, 28, true),
      x: 690 + gapX,
      y: 1030 + gapY,
    })
  }

  // certificate issue date
  const dates = certificateInfo.dates;

  for (let i = 0; i < dates.length; i++) {
    drawText(canvas, ctx, dates[i], {
      textColor: colors.blue,
      font: font(fontConfig.primary, 24.5),
      x: 1014,
      y: 1257 + 43 * i,
      align: "center"
    })
  }

  // barcode & metadata
  if (certificateInfo.barcode && certificateInfo.metadata) {
    drawBarcode(canvas, ctx,
      certificateInfo.barcode,
      certificateInfo.metadata,
      {
        color: colors.black,
        metadataFont: font(fontConfig.arial, 12, true),
        labelFont: font(fontConfig.arial, 20, true),
      }
    )
  }

  // qrcode
  if (qrcodeContent) {
    const qrcodeSize = 220;
    const gapSize = 38;
    const qrcodeBuffer = await QRCode.toBuffer(qrcodeContent, { margin: 0, width: qrcodeSize });
    const qrcodeImage = await loadImage(qrcodeBuffer);
    const qrcodeCoordinate = [1035, 1630]

    ctx.drawImage(qrcodeImage, qrcodeCoordinate[0], qrcodeCoordinate[1]);

    const qrcodeTexts = [
      "សូមស្កេនដើម្បី",
      "ផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ",
      "https://www.verify.gov.kh"
    ];

    const qrcodeY = (qrcodeCoordinate[1] + qrcodeSize) - (gapSize * (qrcodeTexts.length - 1));
    for (let i = qrcodeTexts.length - 1; i >= 0; i--) {
      drawText(canvas, ctx, qrcodeTexts[i], {
        font: font(fontConfig.primary, 22, true),
        textColor: colors.black,
        align: "right",
        margin: 425,
        y: qrcodeY + i * gapSize,
      });
    }
  }


  // draw profile photo
  if (certificateInfo.photoUrl) {
    const profileImage = await loadRemoteResource(certificateInfo.photoUrl);
    if (profileImage) {
      const profileMaxWidth = 253;
      const profileHeight = profileMaxWidth / (profileImage.width / profileImage.height);
      const profileX = 124;
      const profileY = 622;
      ctx.drawImage(profileImage, profileX, profileY, profileMaxWidth, profileHeight);

      if (certificateInfo.originalPhotoPath) {
        const photoLabelX = profileX;
        const photoLabelY = profileY + profileHeight;

        drawText(canvas, ctx, certificateInfo.originalPhotoPath, {
          textColor: colors.blue,
          x: photoLabelX,
          y: photoLabelY + 8,
          font: `bold 11px Arial, sans-serif`,
          align: "left",
        })

      }
    }
  }

  return canvas;
}



function drawBarcode(canvas, ctx, value, metadata, options) {
  if (!value) return;

  const c = createCanvas(100, 100)

  JsBarcode(c, value, {
    height: 25,
    displayValue: false,
    margin: 0,
    lineColor: "black",
    background: "white",
    format: 'CODE39' // CODE39 output image size is larger than CODE128.
  });

  ctx.drawImage(c, 106, 1774, 455, c.height);

  // draw value
  drawText(canvas, ctx, value, {
    textColor: options.labelColor,
    align: 'center',
    font: options.labelFont,
    x: 300,
    y: 1830,
  })

  if (metadata) {
    // draw certificate metadata
    drawText(canvas, ctx, metadata, {
      textColor: options.labelColor,
      align: 'center',
      font: options.metadataFont,
      x: 300,
      y: 1768
    })
  }

  return {
    x: 50,
    y: 1770,
    width: c.width,
    height: c.height,
  }
}

function drawText(canvas, ctx, text, options = {}) {
  if (typeof text !== 'string' || text.length === 0) return;

  options.margin = options.margin || 0;
  options.align = options.align || "left"
  ctx.fillStyle = options.textColor || "black"

  let textOffsetX = 0;
  let textOffsetY = options.y || 0;
  let textWidth = 0;

  // set font before measure
  ctx.font = options.font || '12px Arial, sans-serif';

  if (options.align === 'center') {
    textWidth = ctx.measureText(text).width;
    textOffsetX = (canvas.width - textWidth) / 2;
  }

  if (options.align === 'right') {
    textWidth = ctx.measureText(text).width;
    textOffsetX = (canvas.width - textWidth);
    textOffsetX -= options.margin;
  }

  if (options.align === 'left') {
    textOffsetX += options.margin;
  }

  if (options.x) {
    textOffsetX = options.x;

    if (options.align === 'center') {
      textOffsetX -= textWidth / 2
    }

  }

  ctx.fillText(text, textOffsetX, textOffsetY);

  return {
    textWidth,
    textOffsetX,
    textOffsetY,
  }
}

function drawTexts(canvas, ctx, options = {}, ...texts) {

  options.align = options.align || "left";
  options.margin = options.margin || 0;
  options.gap = options.gap || 0;

  const items = [];

  // layout
  ctx.save()

  const totalGapSize = options.gap * (texts.length - 1);
  let totalWidth = totalGapSize;

  for (const textBlock of texts) {
    ctx.font = textBlock.font;
    const w = ctx.measureText(textBlock.text).width;

    items.push({
      textBlock,
      textWidth: w,
    })

    totalWidth += w;
  }

  ctx.restore()

  // draw
  let offset = 0;

  if (options.align === "center") {
    offset = (canvas.width - totalWidth) / 2;
  }

  if (options.align === "right") {
    offset = canvas.width - totalWidth;
    offset -= options.margin;
  }

  if (options.x) {
    offset = options.x;
    offset += options.margin;

    if (options.align === 'center') {
      offset -= totalWidth / 2
    }

  }

  if (options.align === 'left') {
    offset += options.margin;
  }

  for (const item of items) {
    ctx.font = item.textBlock.font;
    ctx.fillStyle = item.textBlock.textColor;
    ctx.fillText(item.textBlock.text, offset, options.y || 0)

    offset += item.textWidth + options.gap;
  }
}