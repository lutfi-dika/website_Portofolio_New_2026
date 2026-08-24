export interface JourneyItem {
  year: string;
  /** translation key */
  titleKey: string;
  /** translation key */
  descriptionKey: string;
}

export const journey: JourneyItem[] = [
  {
    year: "2024",
    titleKey: "journey2024Title",
    descriptionKey: "journey2024Desc",
  },
  {
    year: "2025",
    titleKey: "journey2025Title",
    descriptionKey: "journey2025Desc",
  },
  {
    year: "2026",
    titleKey: "journeyPklTitle",
    descriptionKey: "journeyPklDesc",
  },
  {
    year: "2026",
    titleKey: "journeyBsiTitle",
    descriptionKey: "journeyBsiDesc",
  },
  {
    year: "2026",
    titleKey: "journeyLutfiDevTitle",
    descriptionKey: "journeyLutfiDevDesc",
  },
];
