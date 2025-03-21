const FEATURE_HELP_URLS = {
  agent_bots: 'https://gladminds.co/hc/agent-bots',
  agents: 'https://gladminds.co/hc/agents',
  audit_logs: 'https://gladminds.co/hc/audit-logs',
  campaigns: 'https://gladminds.co/hc/campaigns',
  canned_responses: 'https://gladminds.co/hc/canned',
  channel_email: 'https://gladminds.co/hc/email',
  channel_facebook: 'https://gladminds.co/hc/fb',
  custom_attributes: 'https://gladminds.co/hc/custom-attributes',
  dashboard_apps: 'https://gladminds.co/hc/dashboard-apps',
  help_center: 'https://gladminds.co/hc/help-center',
  inboxes: 'https://gladminds.co/hc/inboxes',
  integrations: 'https://gladminds.co/hc/integrations',
  labels: 'https://gladminds.co/hc/labels',
  macros: 'https://gladminds.co/hc/macros',
  message_reply_to: 'https://gladminds.co/hc/reply-to',
  reports: 'https://gladminds.co/hc/reports',
  sla: 'https://gladminds.co/hc/sla',
  team_management: 'https://gladminds.co/hc/teams',
  webhook: 'https://gladminds.co/hc/webhooks',
  billing: 'https://gladminds.co/pricing',
};

export function getHelpUrlForFeature(featureName) {
  return FEATURE_HELP_URLS[featureName];
}
