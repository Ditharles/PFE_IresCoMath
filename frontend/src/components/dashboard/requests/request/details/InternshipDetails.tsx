import {  FileText } from "lucide-react";

import { DetailSection } from "../DetailSection";
import { DetailItem } from "../DetailItem";

import { RequestStage } from "../../../../../types/request";
import { formatDate } from "../../../../../utils/utils";

import { ClipboardList } from "lucide-react";
import { FileListViewer } from "../FileListViewer";

export const InternshipDetails = ({ stage, onPreview }: {
  stage: RequestStage;
  onPreview: (url: string) => void;
}) => (
  <>
  <DetailSection
      icon={<ClipboardList className="h-5 w-5 text-purple-500" />}
      title="Détails du stage"
  >
      <DetailItem label="Organisation" value={stage.organization} />
      <DetailItem label="Email de l'organisation" value={stage.organizationEmail} />
      {stage.organizationUrl && (
          <DetailItem label="Site web" value={stage.organizationUrl} />
      )}
      <DetailItem label="Superviseur" value={stage.supervisor} />
      <DetailItem label="Email du superviseur" value={stage.supervisorEmail} />
      {stage.supervisorPhone && (
          <DetailItem label="Téléphone du superviseur" value={stage.supervisorPhone} />
      )}
      <DetailItem label="Pays" value={stage.country} />
      <DetailItem label="Date de début" value={formatDate(stage.startDate)} />
      <DetailItem label="Date de fin" value={formatDate(stage.endDate)} />
  </DetailSection>

  {stage.letter && (
      <DetailSection
          icon={<FileText className="h-5 w-5 text-green-500" />}
          title="Documents associés"
      >
          <DetailItem label="Lettre de stage">
              <FileListViewer
                  files={[stage.letter]}
                  onPreview={onPreview}
              />
          </DetailItem>
      </DetailSection>
  )}
</>
);