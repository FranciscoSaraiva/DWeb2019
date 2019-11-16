<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="pr.html">
    <html>
        <head>
            <title>Project Record</title>
            <meta charset="UTF-8"></meta>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            <style>
                hr {
                    display: block;
                    unicode-bidi: isolate;
                    margin-block-start: 0.5em;
                    margin-block-end: 0.5em;
                    margin-inline-start: auto;
                    margin-inline-end: auto;
                    overflow: hidden;
                    border-style: inset;
                    border-width: 1px;
                }
            </style>
        </head>
        <body class="w3-container">
            <h1 style="text-align:center">Project Record</h1>
            <xsl:apply-templates />
        </body>
    </html>
        </xsl:result-document>
    </xsl:template> 
       
    <!-- TEMPLATES -->
    <xsl:template match="metadata">
        <hr/>
        <table>
            <tr>
                <td>
                    <strong>KEY NAME:</strong> 
                    <xsl:value-of select="keyname"/>
                </td>
                <td>
                    <strong>BEGIN DATE:</strong> 
                    <xsl:value-of select="bdate"/>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>TITLE:</strong> 
                    <xsl:value-of select="title"/>
                </td>
                <td>
                    <strong>END DATE:</strong> 
                    <xsl:value-of select="edate"/>
                </td>
            </tr>
            <tr>
                <xsl:choose>
                    <xsl:when test="subtitle">
                        <td>
                            <strong>SUBTITLE:</strong> 
                            <xsl:value-of select="subtitle"/>
                        </td>
                    </xsl:when>
                </xsl:choose>
                <td>
                    <strong>SUPERVISOR:</strong> 
                    <a href="{supervisor/@homepage}">      
                        <xsl:value-of select="supervisor"/>
                    </a>
                </td>
            </tr>
        </table>
        <hr/>
    </xsl:template>
    <xsl:template match="workteam">
        <hr/>
        <h3>WorkTeam:</h3>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    <xsl:template match="worker">
        <p>
            <xsl:value-of select="identifier"/>.             
            <xsl:value-of select="name"/> -             
            <a href="mailto:{email}">
                <xsl:value-of select="email"/>
            </a>
            <xsl:choose>
                <xsl:when test="git">
                    - <a href="{git}">
                        <xsl:value-of select="git"/>
                      </a>
                </xsl:when>
            </xsl:choose>
            
        </p>
    </xsl:template>
    <xsl:template match="abstract">
        <hr/>
        <h3>ABSTRACT:</h3>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="b">
        <b>
            <xsl:value-of select="."/>   
        </b>
    </xsl:template>
    <xsl:template match="i">
        <i>
            <xsl:value-of select="."/>   
        </i>
    </xsl:template>
    <xsl:template match="u">
        <u>
            <xsl:value-of select="."/>   
        </u>
    </xsl:template>
    <xsl:template match="xref">
        <a href="{./@url}">
            <xsl:value-of select="."/>
        </a>
    </xsl:template>
    <xsl:template match="deliverables">
        <xsl:choose>
            <xsl:when test=".">
                <hr/>
                <h3>Deliverables:</h3>
                <ol>
                    <xsl:apply-templates/>
                </ol>
                <hr/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="deliverable">
        <li>
            <a href="{./@path}">
                <xsl:value-of select="."/>
            </a>
        </li>
    </xsl:template>
</xsl:stylesheet>