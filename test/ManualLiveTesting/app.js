"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeWebService_1 = require("../../src/js/ExchangeWebService");
var MockXHRApi_1 = require("../MockXHRApi");
var MockXHRData_1 = require("../MockXHRData");
var credentials = undefined;
if (typeof window === 'undefined') {
    credentials = require("./credentials");
}
else {
    credentials = { username: "username", password: "password" };
}
var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.start = function () {
        var exch = new ExchangeWebService_1.ExchangeService(ExchangeWebService_1.ExchangeVersion.Exchange2013);
        exch.Credentials = new ExchangeWebService_1.WebCredentials(credentials.userName, credentials.password);
        exch.Url = new ExchangeWebService_1.Uri("https://outlook.office365.com/Ews/Exchange.asmx");
        ExchangeWebService_1.EwsLogging.DebugLogEnabled = true;
        var appt = new ExchangeWebService_1.Appointment(exch);
        appt.Start = ExchangeWebService_1.DateTime.Now.Add(48, 'hour');
        appt.End = ExchangeWebService_1.DateTime.Now.Add(49, 'hour');
        appt.Subject = "some subject";
        appt.Location = "Plot 371 2nd floor";
        appt.Body = new ExchangeWebService_1.MessageBody(ExchangeWebService_1.BodyType.HTML, "Some body text");
        appt.RequiredAttendees.Add("gs@mysupport.in");
        appt.RequiredAttendees.Add("mailtosinghs@gmail.com");
        appt.Save(ExchangeWebService_1.SendInvitationsMode.SendToAllAndSaveCopy).then(function () {
            console.log("------------");
        }, function (ei) {
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("error");
        });
        return;
        var mockXhr = new MockXHRApi_1.MockXHRApi();
        //exch.XHRApi = mockXhr;
        var oof = new ExchangeWebService_1.OofSettings();
        oof.State = ExchangeWebService_1.OofState.Enabled;
        oof.InternalReply = new ExchangeWebService_1.OofReply("internal message");
        oof.ExternalReply = new ExchangeWebService_1.OofReply("external message");
        //oof.AllowExternalOof = OofExternalAudience.All;        
        oof.ExternalAudience = ExchangeWebService_1.OofExternalAudience.All;
        exch.SetUserOofSettings("grouptest@mysupport.in", oof).then(function (resp) {
            //EwsLogging.Log(resp,true, true);
            console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        return;
        exch.GetUserOofSettings("grouptest@mysupport.in").then(function (resp) {
            ExchangeWebService_1.EwsLogging.Log(resp, true, true);
            console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        return;
        mockXhr.requestXml.push(MockXHRData_1.MockXHRData.Operations.CalendarOperations.FindAppointmentRequest);
        mockXhr.responseXml.push(MockXHRData_1.MockXHRData.Operations.CalendarOperations.FindAppointmentRequestResponseWith3results);
        exch.FindAppointments(ExchangeWebService_1.WellKnownFolderName.Calendar, new ExchangeWebService_1.CalendarView(ExchangeWebService_1.DateTime.Now.Add(-7, "days"), ExchangeWebService_1.DateTime.Now)).then(function (resp) {
            ExchangeWebService_1.EwsLogging.Log(resp, true, true);
            console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        return;
        var msgattach = new ExchangeWebService_1.EmailMessage(exch);
        msgattach.Subject = "Dentist Appointment";
        msgattach.Body = new ExchangeWebService_1.MessageBody("The appointment is with Dr. Smith.");
        msgattach.ToRecipients.Add("grouptest@mysupport.in");
        var file = msgattach.Attachments.AddFileAttachment("filename to attach.txt", "c29tZSB0ZXh0");
        //file.
        msgattach.Send().then(function () {
            console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        return;
        var appointment = new ExchangeWebService_1.Appointment(exch);
        appointment.Subject = "Dentist Appointment";
        appointment.Body = new ExchangeWebService_1.MessageBody("The appointment is with Dr. Smith.");
        appointment.Start = new ExchangeWebService_1.DateTime(new Date(2016, 3, 1, 9, 0, 0));
        appointment.End = appointment.Start.Add(2, "hour");
        appointment.Save(ExchangeWebService_1.SendInvitationsMode.SendToNone).then(function () {
            console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        return;
        //exch.TimeZoneDefinition = new TimeZoneDefinition();
        var att1 = new ExchangeWebService_1.AttendeeInfo("gs@singhspro.onmicrosoft.com");
        var att2 = new ExchangeWebService_1.AttendeeInfo("gstest@singhspro.onmicrosoft.com");
        // var att1 = new AttendeeInfo("gautamsi@microsoft.com");
        // var att2 = new AttendeeInfo("abhijitp@microsoft.com");
        // var att3 = new AttendeeInfo("pardeb@microsoft.com");
        // var att4 = new AttendeeInfo("bakul.jais@microsoft.com");
        var tmw = new ExchangeWebService_1.TimeWindow(ExchangeWebService_1.DateTime.Now, new ExchangeWebService_1.DateTime(ExchangeWebService_1.DateTime.Now.TotalMilliSeconds + ExchangeWebService_1.TimeSpan.FromHours(48).TotalMilliseconds));
        var ats = [att1, att2]; //, att3, att4];
        exch.GetUserAvailability(ats, tmw, ExchangeWebService_1.AvailabilityData.FreeBusyAndSuggestions)
            .then(function (fi) {
            //console.log("------found folder------" + fi.DisplayName + "--" + WellKnownFolderName[sr.ParentFolderId.FolderName]);
            ExchangeWebService_1.EwsLogging.Log(fi, true, true);
            console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        console.log("------------");
        return;
        var mockXhr = new MockXHRApi_1.MockXHRApi();
        exch.XHRApi = mockXhr;
        mockXhr.requestXml = [MockXHRData_1.MockXHRData.Operations.ItemOperations.FindItemRequest1ItemView];
        mockXhr.responseXml = [MockXHRData_1.MockXHRData.Operations.ItemOperations.FindItemRequest1ItemViewResponse];
        var PR_TRANSPORT_MESSAGE_HEADERS = new ExchangeWebService_1.ExtendedPropertyDefinition(ExchangeWebService_1.MapiPropertyType.String, 0x007D);
        var EX_normalized_Subject = new ExchangeWebService_1.ExtendedPropertyDefinition(ExchangeWebService_1.MapiPropertyType.String, 0x0E1D); //https://willcode4foodblog.wordpress.com/2012/04/14/understanding-sharing-invitation-requests-ews-managed-api-1-2-part-2/
        var EX_prop2 = new ExchangeWebService_1.ExtendedPropertyDefinition(ExchangeWebService_1.DefaultExtendedPropertySet.InternetHeaders, "Content-Class", ExchangeWebService_1.MapiPropertyType.String);
        var psPropSet = new ExchangeWebService_1.PropertySet(ExchangeWebService_1.BasePropertySet.IdOnly, [PR_TRANSPORT_MESSAGE_HEADERS, EX_normalized_Subject]);
        exch.FindItems(ExchangeWebService_1.WellKnownFolderName.Inbox, new ExchangeWebService_1.ItemView(1))
            .then(function (response) {
            for (var _i = 0, _a = response.Items; _i < _a.length; _i++) {
                var item = _a[_i];
                mockXhr.requestXml = [MockXHRData_1.MockXHRData.Operations.ItemOperations.GetItemRequestWithIDandExtendedPropertyHeader];
                mockXhr.responseXml = [MockXHRData_1.MockXHRData.Operations.ItemOperations.GetItemRequestWithIDandExtendedPropertyHeaderResponse];
                var MyPropertySetId = new ExchangeWebService_1.Guid("{C11FF724-AA03-4555-9952-8FA248A11C3E}");
                var extendedPropertyDefinition = new ExchangeWebService_1.ExtendedPropertyDefinition(MyPropertySetId, "Expiration Date", ExchangeWebService_1.MapiPropertyType.String);
                item.SetExtendedProperty(extendedPropertyDefinition, ExchangeWebService_1.DateTime.Now.Add(2, "days").ToISOString());
                item.Update(ExchangeWebService_1.ConflictResolutionMode.AutoResolve);
                item.Load(psPropSet)
                    .then(function (loadResp) {
                    var outval = { outValue: null };
                    //EwsLogging.Log(item,true,true);
                    if (item.TryGetExtendedProperty(PR_TRANSPORT_MESSAGE_HEADERS, outval)) {
                        ExchangeWebService_1.EwsLogging.Log(outval.outValue, true, true);
                    }
                }, function (err) {
                    ExchangeWebService_1.EwsLogging.Log(err, true, true);
                    ExchangeWebService_1.EwsLogging.Log("-------------- error in loading item ----------", true, true);
                });
            }
        }, function (err) {
            ExchangeWebService_1.EwsLogging.Log(err, true, true);
            ExchangeWebService_1.EwsLogging.Log("-------------- error in finditem ----------", true, true);
        });
        return;
        mockXhr.requestXml = [MockXHRData_1.MockXHRData.Operations.ADOperations.DLExpansionRequest];
        mockXhr.responseXml = [MockXHRData_1.MockXHRData.Operations.ADOperations.DLExpansionMultipleMembersSMTPtypeResponse];
        exch.ExpandGroup("group@contoso.com").then(function (response) {
            ExchangeWebService_1.EwsLogging.Log(response, true, true);
            ExchangeWebService_1.EwsLogging.Log("-------------- request complete ----------", true, true);
        });
        return;
        mockXhr.requestXml = [MockXHRData_1.MockXHRData.Operations.ADOperations.GetPasswordExpirationRequest];
        mockXhr.responseXml = [MockXHRData_1.MockXHRData.Operations.ADOperations.GetPasswordExpirationResponse_NeverExpire];
        exch.GetPasswordExpirationDate("gstest@singhs.pro").then(function (response) {
            ExchangeWebService_1.EwsLogging.Log(response, true, true);
            ExchangeWebService_1.EwsLogging.Log("-------------- request complete ----------", true, true);
        });
        return;
        exch.ResolveName("gstest", ExchangeWebService_1.ResolveNameSearchLocation.DirectoryOnly, true, ExchangeWebService_1.PropertySet.IdOnly)
            .then(function (response) {
            ExchangeWebService_1.EwsLogging.Log(response.GetEnumerator()[0].Mailbox.MailboxType, true, true);
            console.log(response._getItem(0).Contact.DirectoryPhoto);
            ExchangeWebService_1.EwsLogging.Log("-------------- request complete ----------", true, true);
        });
        return;
        var items = [];
        var item0 = null;
        exch.FindItems(ExchangeWebService_1.WellKnownFolderName.SentItems, new ExchangeWebService_1.ItemView(3))
            .then(function (response) {
            items = response.Items;
            ExchangeWebService_1.EwsLogging.Log(items[0], true, true);
        })
            .then(function () {
            exch.BindToItem(items[0].Id, ExchangeWebService_1.PropertySet.IdOnly).then(function (response) {
                item0 = response;
                ExchangeWebService_1.EwsLogging.Log(item0, true, true);
            });
        })
            .then(function () {
            item0.Load()
                .then(function (response) {
                ExchangeWebService_1.EwsLogging.Log(item0, true, true);
            });
        });
        return;
        //EwsLogging.DebugLogEnabled = true;
        //var dd = new ext.DOMParser()
        //var domdata = dd.parseFromString('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <soap:Fault> <faultcode>soap:Client</faultcode> <faultstring>Invalid input</faultstring> <faultactor >http://sseely2/AYS17Sept2002/Service1.asmx</faultactor> <detail> <PersonErrorInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <ItemInError TextValue="FirstError"></ItemInError> <CorrectRegularExpression >^([A-Z])([a-z])+</CorrectRegularExpression> </PersonErrorInfo> <PersonErrorInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <ItemInError>LastName</ItemInError> <CorrectRegularExpression >^([A-Z])([a-z])+</CorrectRegularExpression> </PersonErrorInfo> <PersonErrorInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <ItemInError>EmailAddress</ItemInError> <CorrectRegularExpression >^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$</CorrectRegularExpression> </PersonErrorInfo> </detail> </soap:Fault> </soap:Body></soap:Envelope>', "text/xml");
        //var objdata = ext.Parsers.xml2js.parseXMLNode(domdata.documentElement, true);
        //var vv = objdata;
        //return;
        var colorName = Color[2];
        var cname = Object.prototype.toString.call(Color).slice(8, -1);
        ;
        var rawXML = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"> <s:Header> <h:ServerVersionInfo MajorVersion="15" MinorVersion="1" MajorBuildNumber="154" MinorBuildNumber="18" Version="V2_42" xmlns:h="http://schemas.microsoft.com/exchange/services/2006/types" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/> </s:Header> <s:Body> <m:GetFolderResponse xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"> <m:ResponseMessages> <m:GetFolderResponseMessage ResponseClass="Success"> <m:ResponseCode>NoError</m:ResponseCode> <m:Folders> <t:CalendarFolder> <t:FolderId Id="AAMkADVmNzUzM2M2LTY1ODgtNGIwNS05NWUwLTE5MzJhNWRhNWIzZQAuAAAAAAAt9OU5vf4nTaa38x9WV1pGAQB0vGFf3HZOSb1IxPAYl2sPAAAAAAENAAA=" ChangeKey="AgAAABYAAAB0vGFf3HZOSb1IxPAYl2sPAAAAAAA3"/> <t:ParentFolderId Id="AAMkADVmNzUzM2M2LTY1ODgtNGIwNS05NWUwLTE5MzJhNWRhNWIzZQAuAAAAAAAt9OU5vf4nTaa38x9WV1pGAQB0vGFf3HZOSb1IxPAYl2sPAAAAAAEIAAA=" ChangeKey="AQAAAA=="/> <t:FolderClass>IPF.Appointment</t:FolderClass> <t:DisplayName>Calendar</t:DisplayName> <t:TotalCount>0</t:TotalCount> <t:ChildFolderCount>0</t:ChildFolderCount> <t:EffectiveRights> <t:CreateAssociated>true</t:CreateAssociated> <t:CreateContents>true</t:CreateContents> <t:CreateHierarchy>true</t:CreateHierarchy> <t:Delete>true</t:Delete> <t:Modify>true</t:Modify> <t:Read>true</t:Read> <t:ViewPrivateItems>true</t:ViewPrivateItems> </t:EffectiveRights> <t:PermissionSet> <t:CalendarPermissions> <t:CalendarPermission> <t:UserId> <t:DistinguishedUser>Default</t:DistinguishedUser> </t:UserId> <t:CanCreateItems>false</t:CanCreateItems> <t:CanCreateSubFolders>false</t:CanCreateSubFolders> <t:IsFolderOwner>false</t:IsFolderOwner> <t:IsFolderVisible>false</t:IsFolderVisible> <t:IsFolderContact>false</t:IsFolderContact> <t:EditItems>None</t:EditItems> <t:DeleteItems>None</t:DeleteItems> <t:ReadItems>TimeOnly</t:ReadItems> <t:CalendarPermissionLevel>FreeBusyTimeOnly</t:CalendarPermissionLevel> </t:CalendarPermission> <t:CalendarPermission> <t:UserId> <t:DistinguishedUser>Anonymous</t:DistinguishedUser> </t:UserId> <t:CanCreateItems>false</t:CanCreateItems> <t:CanCreateSubFolders>false</t:CanCreateSubFolders> <t:IsFolderOwner>false</t:IsFolderOwner> <t:IsFolderVisible>false</t:IsFolderVisible> <t:IsFolderContact>false</t:IsFolderContact> <t:EditItems>None</t:EditItems> <t:DeleteItems>None</t:DeleteItems> <t:ReadItems>None</t:ReadItems> <t:CalendarPermissionLevel>None</t:CalendarPermissionLevel> </t:CalendarPermission> </t:CalendarPermissions> </t:PermissionSet> </t:CalendarFolder> </m:Folders> </m:GetFolderResponseMessage> </m:ResponseMessages> </m:GetFolderResponse> </s:Body> </s:Envelope>';
        var parser = new ExchangeWebService_1.DOMParser();
        //var xmlDoc = parser.parseFromString(rawXML, "text/xml");
        //this.treeWalker = this.xmlDoc.createTreeWalker(this.xmlDoc, NodeFilter.SHOW_ELEMENT, null, false);
        //this.currentNode = this.treeWalker.root;
        //var objjt = ext.xml2JsObject.parseXMLNode(xmlDoc.documentElement, true);
        //EwsLogging.DebugLog(objjt, true);
        //return;
        //var autod = new Microsoft.Exchange.WebServices.Autodiscover.AutodiscoverService("https://autodiscover-s.coutlook.com/autodiscover/autodiscover.svc", "singhspro.onmicrosoft.com", Microsoft.Exchange.WebServices.Data.ExchangeVersion.Exchange2013);
        //var autod = new AutodiscoverService();//"https://pod51045.outlook.com/autodiscover/autodiscover.svc", "singhspro.onmicrosoft.com", ExchangeVersion.Exchange2013);
        //autod.RedirectionUrlValidationCallback = (val) => { return true };
        //var autod = new AutodiscoverService("https://pod51045.outlook.com/autodiscover/autodiscover.svc", "microsoft.com", ExchangeVersion.Exchange2013);
        //var x = new Microsoft.Exchange.WebServices.Data.ExchangeService(Microsoft.Exchange.WebServices.Data.ExchangeVersion.Exchange2010_SP2);
        //autod.Credentials = new ExchangeCredentials(credentials.userName, credentials.password);
        //EwsLogging.DebugLog(exch.Credentials, true);
        //exch.TimeZoneDefinition = new TimeZoneDefinition();
        var att1 = new ExchangeWebService_1.AttendeeInfo("gs@singhspro.onmicrosoft.com");
        var att2 = new ExchangeWebService_1.AttendeeInfo("gstest@singhspro.onmicrosoft.com");
        // var att1 = new AttendeeInfo("gautamsi@microsoft.com");
        // var att2 = new AttendeeInfo("abhijitp@microsoft.com");
        // var att3 = new AttendeeInfo("pardeb@microsoft.com");
        // var att4 = new AttendeeInfo("bakul.jais@microsoft.com");
        var tmw = new ExchangeWebService_1.TimeWindow(ExchangeWebService_1.DateTime.Now, new ExchangeWebService_1.DateTime(ExchangeWebService_1.DateTime.Now.TotalMilliSeconds + ExchangeWebService_1.TimeSpan.FromHours(48).TotalMilliseconds));
        var ats = [att1, att2]; //, att3, att4];
        exch.GetUserAvailability(ats, tmw, ExchangeWebService_1.AvailabilityData.FreeBusyAndSuggestions)
            .then(function (fi) {
            //console.log("------found folder------" + fi.DisplayName + "--" + WellKnownFolderName[sr.ParentFolderId.FolderName]);
            ExchangeWebService_1.EwsLogging.Log(fi, true, true);
            for (var res in fi.SuggestionsResponse)
                console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        console.log("------------");
        return;
        return;
        var view = new ExchangeWebService_1.ItemView(3);
        view.PropertySet = ExchangeWebService_1.PropertySet.FirstClassProperties;
        //var sf = new SearchFilter.ContainsSubstring(ItemSchema.Subject,"test");
        var groupBy = new ExchangeWebService_1.Grouping();
        groupBy.GroupOn = ExchangeWebService_1.EmailMessageSchema.Instance.Subject;
        groupBy.AggregateOn = ExchangeWebService_1.ItemSchema.Instance.DateTimeReceived;
        groupBy.AggregateType = ExchangeWebService_1.AggregateType.Minimum;
        groupBy.SortDirection = ExchangeWebService_1.SortDirection.Descending;
        exch.FindItems(new ExchangeWebService_1.FolderId(ExchangeWebService_1.WellKnownFolderName.SentItems), view, groupBy)
            .then(function (fi) {
            //console.log("------found folder------" + fi.DisplayName + "--" + WellKnownFolderName[sr.ParentFolderId.FolderName]);
            ExchangeWebService_1.EwsLogging.Log(fi, true, true);
            console.log("------------");
        }, function (ei) {
            ExchangeWebService_1.EwsLogging.Log(ei, true, true);
            console.log(ei.stack, ei.stack.split("\n"));
            console.log("------------");
        });
        console.log("------------");
        return;
        var fid = new ExchangeWebService_1.FolderId(ExchangeWebService_1.WellKnownFolderName.SentItems);
        exch.BindToFolder(fid, ExchangeWebService_1.PropertySet.FirstClassProperties)
            .then(function (sr) {
            console.log("------found folder------" + sr.DisplayName + "--");
            //EwsLogging.Log(sr, true, true);
            sr.FindItems(new ExchangeWebService_1.ItemView(3))
                .then(function (fi) {
                //console.log("------found folder------" + fi.DisplayName + "--" + WellKnownFolderName[sr.ParentFolderId.FolderName]);
                ExchangeWebService_1.EwsLogging.Log(fi, true, true);
                console.log("------------");
            }, function (ei) {
                ExchangeWebService_1.EwsLogging.Log(ei, true, true);
                console.log("------------");
            });
            console.log("------------");
        }, function (e) {
            ExchangeWebService_1.EwsLogging.Log(e, true, true);
            console.log("------------");
        });
        return;
        //        var util = require('util');
        //        exch.AutodiscoverUrl("gs@singhspro.onmicrosoft.com",(url) => { return true; }).then((resp) => {
        //            console.log(util.inspect(exch.Url, { showHidden: false, depth: null, colors: true }));
        //            exch.BindToFolder
        //            console.log("------------");
        //        },(err) => {
        //                
        //                console.log(util.inspect(err, { showHidden: false, depth: null, colors: true }));
        //                console.log("------------");
        //
        //            });
        //
        //        return;
        // var autod = new AutodiscoverService();//new Uri("https://pod51045.outlook.com/autodiscover/autodiscover.svc"), ExchangeVersion.Exchange2013);
        // autod.RedirectionUrlValidationCallback = (val) => { return true };      
        // autod.Credentials = new ExchangeCredentials(credentials.userName, credentials.password);
        // var s: UserSettingName[] = [];
        // s.push(UserSettingName.InternalEwsUrl);
        // s.push(UserSettingName.ExternalEwsUrl);
        // s.push(UserSettingName.UserDisplayName);
        // s.push(UserSettingName.UserDN);
        // s.push(UserSettingName.EwsPartnerUrl);
        // s.push(UserSettingName.DocumentSharingLocations);
        // s.push(UserSettingName.MailboxDN);
        // s.push(UserSettingName.ActiveDirectoryServer);
        // s.push(UserSettingName.CasVersion);
        // s.push(UserSettingName.ExternalWebClientUrls);
        // s.push(UserSettingName.ExternalImap4Connections);
        // s.push(UserSettingName.AlternateMailboxes);
        // //autod.GetUserSettings(["gstest@singhspro.onmicrosoft.com", "gstest@singhspro.onmicrosoft.com"], s)
        // autod.GetUserSettings("gstest@singhspro.onmicrosoft.com", UserSettingName.InternalEwsUrl, UserSettingName.ExternalEwsUrl, UserSettingName.AlternateMailboxes, UserSettingName.MailboxDN, UserSettingName.CasVersion, UserSettingName.DocumentSharingLocations, UserSettingName.ActiveDirectoryServer, UserSettingName.EwsPartnerUrl)
        //     .then((sr) => {
        //         var util = require('util');
        //         console.log(util.inspect(sr, { showHidden: false, depth: null, colors: true }));
        //         console.log(autod.Url.ToString());
        //         //console.log(sr);
        //         console.log("------------");
        //     }, (e: any) => {
        //         var util = require('util');
        //         console.log(util.inspect(e, { showHidden: false, depth: null, colors: true }));
        //         console.log("------------");
        //     });
        // return;
        ////var d: DomainSettingName[] = [];
        //////return;
        ////d.push(DomainSettingName.ExternalEwsUrl);
        ////d.push(DomainSettingName.ExternalEwsVersion);
        ////autod.GetDomainSettings("singhspro.onmicrosoft.com", d).then((dr) => {
        ////    var util = require('util');
        ////    console.log(util.inspect(dr, { showHidden: false, depth: null, colors: true }));
        ////    console.log("------------");
        ////},(e: any) => {
        ////        console.log(e);
        ////        console.log("------------");
        ////    });
        //this.span.innerHTML = "";
        //this.div.innerHTML = "";
        //this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString() + " " + colorName + " " + cname, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
exports.Greeter = Greeter;
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
;
var greeter = new Greeter();
greeter.start();
//{ "Body" : 
//    { "FolderIds" : 
//        [ 
//        { "Id" : "inbox",
//            "__type" : "DistinguishedFolderId:#Exchange"
//          } 
//      ],
//      "FolderShape" : 
//        { "BaseShape" : "AllProperties" 
//        }
//    },
//  "Header" : 
//    { "RequestServerVersion" : "Exchange2013_SP1" 
//    }
//}
// -----------fault code
//{ __prefix: 's',
//  __xmlns:
//   { s: 'http://schemas.xmlsoap.org/soap/envelope/',
//     a: 'http://schemas.microsoft.com/exchange/services/2006/types',
//     e: 'http://schemas.microsoft.com/exchange/services/2006/errors',
//     t: 'http://schemas.microsoft.com/exchange/services/2006/types' },
//  Body:
//   { __prefix: 's',
//     Fault:
//      { __prefix: 's',
//        faultcode: 'a:ErrorSchemaValidation',
//        faultstring:
//         { 'xml:lang': 'en-US',
//           faultstring: 'The request failed schema validation: The required attribute \'Id\' is missing.' },
//        detail:
//         { ResponseCode: 'ErrorSchemaValidation',
//           Message: 'The request failed schema validation.',
//           MessageXml:
//            { __prefix: 't',
//              LineNumber: '1',
//              LinePosition: '472',
//              Violation: 'The required attribute \'Id\' is missing.' } } } } }
