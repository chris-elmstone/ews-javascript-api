﻿
import { EwsServiceXmlWriter } from "../../Core/EwsServiceXmlWriter";
import { XmlElementNames } from "../../Core/XmlElementNames";
import { EwsUtilities } from "../../Core/EwsUtilities";

import { XmlNamespace } from "../../Enumerations/XmlNamespace";
import { DomainSettingName } from "../../Enumerations/DomainSettingName";
import { ExchangeVersion } from "../../Enumerations/ExchangeVersion";

import { Promise } from "../../Promise";
import { Uri } from "../../Uri";


import { GetDomainSettingsResponseCollection } from "../Responses/GetDomainSettingsResponseCollection";
import { AutodiscoverService } from "../AutodiscoverService";
import { AutodiscoverResponse } from "../Responses/AutodiscoverResponse";
import { AutodiscoverRequest } from "./AutodiscoverRequest";
import { hasValue } from "../../ExtensionMethods";
export class GetDomainSettingsRequest extends AutodiscoverRequest {
    private static GetDomainSettingsActionUri: string = EwsUtilities.AutodiscoverSoapNamespace + "/Autodiscover/GetDomainSettings";
    Domains: string[];// System.Collections.Generic.List<string>;
    Settings: DomainSettingName[];// System.Collections.Generic.List<DomainSettingName>;
    RequestedVersion: ExchangeVersion;
    private domains: string;// System.Collections.Generic.List<string>;
    private settings: DomainSettingName[];// System.Collections.Generic.List<DomainSettingName>;
    private requestedVersion: ExchangeVersion;

    constructor(service: AutodiscoverService, url: Uri) {
        super(service, url);
    }

    CreateServiceResponse(): AutodiscoverResponse { return new GetDomainSettingsResponseCollection(); }
    Execute(): Promise<GetDomainSettingsResponseCollection> {
        var responses = <Promise<GetDomainSettingsResponseCollection>>this.InternalExecute();

        //GetDomainSettingsResponseCollection responses = (GetDomainSettingsResponseCollection) this.InternalExecute();
        //if (responses.ErrorCode == AutodiscoverErrorCode.NoError) {
        //    this.PostProcessResponses(responses);
        //}

        return responses;
    }
    GetRequestXmlElementName(): string { return XmlElementNames.GetDomainSettingsRequestMessage; }
    GetResponseXmlElementName(): string { return XmlElementNames.GetDomainSettingsResponseMessage; }
    GetWsAddressingActionName(): string { return GetDomainSettingsRequest.GetDomainSettingsActionUri; }
    PostProcessResponses(responses: GetDomainSettingsResponseCollection): any {
        // Note:The response collection may not include all of the requested domains if the request has been throttled.
        for (var index = 0; index < responses.Count; index++) {
            responses.__thisIndexer(index).Domain = this.Domains[index];
        }
    }
    Validate(): void { super.Validate(); }
    /**@internal */
    WriteAttributesToXml(writer: EwsServiceXmlWriter): void {
        writer.WriteAttributeValue(
            "xmlns",
            EwsUtilities.AutodiscoverSoapNamespacePrefix,
            EwsUtilities.AutodiscoverSoapNamespace);
    }
    /**@internal */
    WriteElementsToXml(writer: EwsServiceXmlWriter): any {
        writer.WriteStartElement(XmlNamespace.Autodiscover, XmlElementNames.Request);

        writer.WriteStartElement(XmlNamespace.Autodiscover, XmlElementNames.Domains);

        for (var domain of this.Domains) {

            //if (!string.IsNullOrEmpty(domain)) {
            if (domain != undefined && domain !== "") {
                writer.WriteElementValue(
                    XmlNamespace.Autodiscover,
                    XmlElementNames.Domain,
                    domain);
            }
        }
        writer.WriteEndElement(); //Domains

        writer.WriteStartElement(XmlNamespace.Autodiscover, XmlElementNames.RequestedSettings);
        for (var setting of this.Settings) {

            writer.WriteElementValue(
                XmlNamespace.Autodiscover,
                XmlElementNames.Setting,
                DomainSettingName[setting]);
        }

        writer.WriteEndElement(); //RequestedSettings

        if (hasValue(this.requestedVersion)) {
            writer.WriteElementValue(XmlNamespace.Autodiscover,
                XmlElementNames.RequestedVersion,
                this.requestedVersion);
        }

        writer.WriteEndElement(); //Request
    }
}