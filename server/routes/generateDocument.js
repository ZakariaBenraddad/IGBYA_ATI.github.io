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

router.post("/generate-document", async (req, res) => {
    console.log("Received request for document generation", req.body);
    try {
        const formData = req.body;

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
                                checked: formData.requestType === "creation",
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
                                checked: formData.requestType === "debridage",
                            },
                        ]),
                        new Paragraph({ text: " " }),
                        createSection("Service demandé :", [
                            {
                                text: "Accès distant d'un user RAM au SI RAM",
                                checked: formData.serviceRequested.includes(
                                    "Accès distant d'un user RAM au SI RAM"
                                ),
                            },
                            {
                                text: "Accès non standard d'un user RAM au Web",
                                checked: formData.serviceRequested.includes(
                                    "Accès non standard d'un user RAM au Web"
                                ),
                            },
                            {
                                text: "Accès distant pour partenaire",
                                checked: formData.serviceRequested.includes(
                                    "Accès distant pour partenaire"
                                ),
                            },
                            {
                                text: "Accès LAN pour prestataires",
                                checked: formData.serviceRequested.includes(
                                    "Accès LAN pour prestataires"
                                ),
                            },
                            {
                                text: "Autre (à préciser en complément)",
                                checked: formData.serviceRequested.includes(
                                    "Autre (à préciser en complément)"
                                ),
                            },
                        ]),
                        new Paragraph({ text: " " }),
                        createRequesterTable(formData.requester),
                        new Paragraph({ text: " " }),
                        createBeneficiaryTable(formData.beneficiary),
                        new Paragraph({ text: " " }),
                        createNeedSection(formData.need),
                        new Paragraph({ text: " " }),
                        createDescriptionSection(formData.description),
                        new Paragraph({ text: " " }),
                        createSignatureSection(),
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
                                                        "../assets/ram_logo.png"
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
            // Implement the beneficiary table similar to the requester table
            // This is a placeholder and needs to be implemented
        }

        function createNeedSection(need) {
            // Implement the need section
            // This is a placeholder and needs to be implemented
        }

        function createDescriptionSection(description) {
            // Implement the description section
            // This is a placeholder and needs to be implemented
        }

        function createSignatureSection() {
            // Implement the signature section
            // This is a placeholder and needs to be implemented
        }

        // Generate the document
        const buffer = await Packer.toBuffer(doc);
        // Set headers for file download
        res.json({
            message: "Document generated successfully",
            buffer: Array.from(new Uint8Array(buffer)),
        });
    } catch (error) {
        console.error("Error generating document:", error);
        res.status(500).json({
            message: "Error generating document",
            error: error.message,
        });
    }
});

module.exports = router;
