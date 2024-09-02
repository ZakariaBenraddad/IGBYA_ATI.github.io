const express = require("express");
const router = express.Router();
const {
    Document,
    Paragraph,
    Packer,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
    BorderStyle,
    ImageRun,
    Header,
    Footer,
    HeightRule,
    Tab,
    CheckBox,
} = require("docx");
const fs = require("fs");
const path = require("path");
let imageData;

router.post("/generate-document", async (req, res) => {
    console.log("Received request for document generation");
    try {
        const formData = req.body;
        console.log("Form data received:", JSON.stringify(formData, null, 2));

        // Create a new document
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        createHeader(),
                        new Paragraph({ text: " " }),
                        createSection("Type de la demande :", [
                            {
                                text: "Création",
                                checked: formData.requestType === "création",
                            },
                            {
                                text: "Modification",
                                checked:
                                    formData.requestType === "modification",
                            },
                            {
                                text: "Suppression",
                                checked: formData.requestType === "suppression",
                            },
                            {
                                text: "Débridage de poste",
                                checked:
                                    formData.requestType ===
                                    "débridage de poste",
                            },
                        ]),
                        new Paragraph({ text: " " }),
                        createSection(
                            "Service demandé :",
                            formData.serviceRequested.map((service) => ({
                                text: service,
                                checked: true,
                            }))
                        ),
                        new Paragraph({ text: " " }),
                        createRequesterTable(formData.requester),
                        new Paragraph({ text: " " }),
                        createBeneficiaryTable(formData.beneficiary),
                        new Paragraph({ text: " " }),
                        createNeedSection(formData.need),
                        new Paragraph({ text: " " }),
                        createDescriptionSection(formData.description),
                        new Paragraph({ text: " " }),
                        createSignatureSection(formData.signatures),
                    ],
                },
            ],
        });

        function createSection(title, items) {
            return [
                new Paragraph({
                    children: [new TextRun({ text: title, bold: true })],
                    shading: { fill: "808080" },
                }),
                ...items.map(
                    (item) =>
                        new Paragraph({
                            children: [
                                new CheckBox({ checked: item.checked }),
                                new TextRun({ text: item.text }),
                            ],
                        })
                ),
            ];
        }
        function createHeader() {
            return new Table({
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new ImageRun({
                                                data: fs.readFileSync(
                                                    path.join(
                                                        __dirname,
                                                        "../../client/src/assets/Capture d'écran 2024-08-30 135118"
                                                    )
                                                ),
                                                transformation: {
                                                    width: 100,
                                                    height: 50,
                                                },
                                            }),
                                        ],
                                    }),
                                ],
                                width: {
                                    size: 33,
                                    type: WidthType.PERCENTAGE,
                                },
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "FICHE DE DEMANDE SECURITE",
                                        alignment: AlignmentType.CENTER,
                                        bold: true,
                                    }),
                                ],
                                width: {
                                    size: 33,
                                    type: WidthType.PERCENTAGE,
                                },
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "Titre : PS12-F04",
                                        alignment: AlignmentType.RIGHT,
                                    }),
                                    new Paragraph({
                                        text: "Page : 1/2",
                                        alignment: AlignmentType.RIGHT,
                                    }),
                                ],
                                width: {
                                    size: 33,
                                    type: WidthType.PERCENTAGE,
                                },
                            }),
                        ],
                    }),
                ],
            });
        }
        function createRequesterTable(requester) {
            return new Table({
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                borders: {
                    top: {
                        style: BorderStyle.SINGLE,
                        size: 1,
                        color: "000000",
                    },
                    bottom: {
                        style: BorderStyle.SINGLE,
                        size: 1,
                        color: "000000",
                    },
                    left: {
                        style: BorderStyle.SINGLE,
                        size: 1,
                        color: "000000",
                    },
                    right: {
                        style: BorderStyle.SINGLE,
                        size: 1,
                        color: "000000",
                    },
                    insideHorizontal: {
                        style: BorderStyle.SINGLE,
                        size: 1,
                        color: "000000",
                    },
                    insideVertical: {
                        style: BorderStyle.SINGLE,
                        size: 1,
                        color: "000000",
                    },
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "Demandeur",
                                        bold: true,
                                    }),
                                ],
                                shading: { fill: "CCCCCC" },
                                columnSpan: 4,
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({ text: "Nom", bold: true }),
                                ],
                            }),
                            new TableCell({
                                children: [new Paragraph(requester.lastName)],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "Prénom",
                                        bold: true,
                                    }),
                                ],
                            }),
                            new TableCell({
                                children: [new Paragraph(requester.firstName)],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "Matricule",
                                        bold: true,
                                    }),
                                ],
                            }),
                            new TableCell({
                                children: [new Paragraph(requester.employeeId)],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "Direction",
                                        bold: true,
                                    }),
                                ],
                            }),
                            new TableCell({
                                children: [new Paragraph(requester.department)],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({ text: "Site", bold: true }),
                                ],
                            }),
                            new TableCell({
                                children: [new Paragraph(requester.site)],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "Date de la demande",
                                        bold: true,
                                    }),
                                ],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(requester.requestDate),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        function createBeneficiaryTable(beneficiary) {
            return new Table({
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph("Beneficiary Information"),
                                ],
                                columnSpan: 2,
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Nom")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(beneficiary.lastName || ""),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Prénom")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(beneficiary.firstName || ""),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Matricule")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(beneficiary.employeeId || ""),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Téléphone")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(beneficiary.phone || ""),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Email")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(beneficiary.email || ""),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Société Partenaire")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(
                                        beneficiary.partnerCompany || ""
                                    ),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        function createNeedSection(need) {
            return new Table({
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: "Besoin (les accès pour non RAM ne peuvent être permanents)",
                                        bold: true,
                                    }),
                                ],
                                columnSpan: 2,
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Usage")],
                            }),
                            new TableCell({
                                children: [new Paragraph(need.usage || "")],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Permanente")],
                            }),
                            new TableCell({
                                children: [
                                    new CheckBox({
                                        checked: need.duration.permanent,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Temporaire")],
                            }),
                            new TableCell({
                                children: [
                                    new CheckBox({
                                        checked: need.duration.temporary,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("De")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(need.duration.from || ""),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("À")],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(need.duration.to || ""),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        function createDescriptionSection(description) {
            return new Paragraph({
                children: [
                    new TextRun("Description: "),
                    new TextRun(description || "No description provided"),
                ],
            });
        }
        function createSignatureSection(signatures) {
            return new Table({
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph("Accord Directeur Demandeur"),
                                ],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(signatures.requesterDirector),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph(
                                        "Accord Administrateur Fonctionnel"
                                    ),
                                ],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(
                                        signatures.functionalAdministrator
                                    ),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph(
                                        "Accord Responsable SI (GE, OC ou IT)"
                                    ),
                                ],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph(signatures.sigeResponsible),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Accord RSSI")],
                            }),
                            new TableCell({
                                children: [new Paragraph(signatures.rssi)],
                            }),
                        ],
                    }),
                ],
            });
        }
        const buffer = await Packer.toBuffer(doc);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=demande_de_securite.docx"
        );
        res.send(buffer);
    } catch (error) {
        console.error("Error generating document:", error);
        res.status(500).send("Error generating document");
    }
});

module.exports = router;
