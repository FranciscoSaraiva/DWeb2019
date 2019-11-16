<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <!-- OUTPUT -->
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>

    <!-- Index -->
    <xsl:template match="/">
        <xsl:result-document href="arqs/index.html">
            <html>
                <head>
                    <title>Arqueossítios de Portugal</title>
                    <meta charset="UTF-8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>              
                </head>
                <body class="w3-container">
                    <div class="w3-card">
                        <header class="w3-container w3-amber">
                            <h1 class="w3-title" style="text-align:center">Arqueossítios de
                                Portugal</h1>
                        </header>
                    </div>
                    <ul class="w3-ul w3-hoverable w3-large w3-center">
                        <xsl:apply-templates mode="indice"/>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>

    <!-- TEMPLATES -->
    <!-- Indice -->
    <xsl:template match="ARQELEM" mode="indice">
        <li class="w3-hover-pale-yellow">
            <a name="{count(preceding-sibling::*)+1}"/>
            <a href="./{count(preceding-sibling::*)+1}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>

    <!-- Arquessítio -->
    <xsl:template match="ARQELEM">
        <xsl:result-document href="arqs/arq_{count(preceding-sibling::*)+1}.xml">
            <xsl:processing-instruction name="xml-stylesheet">type="text/xsl" href="template.xsl"</xsl:processing-instruction>
            <xsl:copy-of select="."></xsl:copy-of>
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>
