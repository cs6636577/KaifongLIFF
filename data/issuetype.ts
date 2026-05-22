export interface SubIssueOption{
    value: string
    label: string
}

export interface IssueTypeOption{
    value: string
    label: string
    sub: SubIssueOption[]
}

export const IssueTypeOptions: IssueTypeOption[] = [
    {
        "value": "INFRA",
        "label": "โครงสร้างพื้นฐานและสาธารณูปโภค",
        "sub": [
            {
                "value": "INFRA_ROAD",
                "label": "ถนนและทางเท้า"
            },
            {
                "value": "INFRA_LIGHT",
                "label": "ไฟฟ้าสาธารณะ"
            },
            {
                "value": "INFRA_DRAIN",
                "label": "การระบายน้ำ"
            },
            {
                "value": "INFRA_BUILDING",
                "label": "อาคารและสิ่งก่อสร้าง"
            }
        ]
    },
    {
        "value": "ENV",
        "label": "สิ่งแวดล้อมและสุขาภิบาล",
        "sub": [
            {
                "value": "ENV_WASTE",
                "label": "การจัดการขยะ"
            },
            {
                "value": "ENV_GREEN",
                "label": "พื้นที่สีเขียว"
            },
            {
                "value": "ENV_CLEAN",
                "label": "ความสะอาดทั่วไป"
            },
            {
                "value": "ENV_ANIMAL",
                "label": "ซากสัตว์"
            }
        ]
    },
    {
        "value": "HEALTH",
        "label": "สาธารณสุขและมลพิษ",
        "sub": [
            {
                "value": "HEALTH_NOISE",
                "label": "มลพิษทางเสียง"
            },
            {
                "value": "HEALTH_POLLUTION",
                "label": "มลพิษทางอากาศและน้ำ"
            },
            {
                "value": "HEALTH_DISEASE",
                "label": "การควบคุมโรค"
            },
            {
                "value": "HEALTH_FOOD",
                "label": "อาหารและตลาด"
            }
        ]
    },{
        "value": "ORDER",
        "label": "ความเป็นระเบียบเรียบร้อยและจราจร",
        "sub": [
            {
                "value": "ORDER_TRAFFIC",
                "label": "การจราจรและที่จอดรถ"
            },
            {
                "value": "ORDER_VENDOR",
                "label": "หาบเร่แผงลอย"
            },
            {
                "value": "ORDER_STRAY",
                "label": "สัตว์จรจัด"
            },
            {
                "value": "ORDER_SIGN",
                "label": "ป้ายผิดกฎหมาย"
            }
        ]
    },
    {
        "value": "SOCIAL",
        "label": "สวัสดิการสังคมและพัฒนาชุมชน",
        "sub": [
            {
                "value": "SOCIAL_WELFARE",
                "label": "เบี้ยยังชีพและสวัสดิการ"
            },
            {
                "value": "SOCIAL_CHILD",
                "label": "ศูนย์พัฒนาเด็กเล็ก"
            },
            {
                "value": "SOCIAL_COMMUNITY",
                "label": "กิจกรรมชุมชน"
            },
            {
                "value": "SOCIAL_JOB",
                "label": "อาชีพและรายได้"
            }
        ]
    },
    {
        "value": "GOV",
        "label": "การบริการเจ้าหน้าที่และธรรมาภิบาล",
        "sub": [
            {
                "value": "GOV_SERVICE",
                "label": "การบริการภาครัฐ"
            },
            {
                "value": "GOV_DIGITAL",
                "label": "บริการดิจิทัล"
            },
            {
                "value": "GOV_TRANSPARENCY",
                "label": "ความโปร่งใส"
            },
            {
                "value": "GOV_FEEDBACK",
                "label": "ข้อเสนอแนะทั่วไป"
            }
        ]
    }
]