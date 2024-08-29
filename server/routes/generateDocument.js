const express = require("express");
const router = express.Router();
const {
    Document,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
} = require("docx");
const fs = require("fs");

router.post("/generate-document", async (req, res) => {
    try {
        const formData = req.body;

        // Create a new document
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Formulaire de demande d'accès",
                                    bold: true,
                                    size: 24,
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({ text: "" }),
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    "Type de la demande"
                                                ),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.requestType
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
                                                    "Service demandé"
                                                ),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.serviceRequested.join(
                                                        ", "
                                                    )
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new Paragraph({ text: "" }),
                        new Paragraph({ text: "Demandeur (RAM):", bold: true }),
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph("Nom")],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.requester.lastName
                                                ),
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
                                                new Paragraph(
                                                    formData.requester.firstName
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph("Matricule"),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.requester.employeeId
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph("Direction"),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.requester.department
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph("Site")],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.requester.site
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph("Date demande"),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.requester.requestDate
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new Paragraph({ text: "" }),
                        new Paragraph({
                            text: "Bénéficiaire (si autre que demandeur):",
                            bold: true,
                        }),
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph("Nom")],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.beneficiary.lastName
                                                ),
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
                                                new Paragraph(
                                                    formData.beneficiary.firstName
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph("Matricule"),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.beneficiary.employeeId
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph("Phone")],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.beneficiary.phone
                                                ),
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
                                                new Paragraph(
                                                    formData.beneficiary.email
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
                                                    "Société Partenaire"
                                                ),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph(
                                                    formData.beneficiary.partnerCompany
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        // Generate the document
        const buffer = await Packer.toBuffer(doc);

        // Set headers for file download
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=formulaire_demande_acces.docx"
        );

        // Send the document
        res.send(buffer);
    } catch (error) {
        console.error("Error generating document:", error);
        res.status(500).json({ message: "Error generating document" });
    }
});

module.exports = router;
