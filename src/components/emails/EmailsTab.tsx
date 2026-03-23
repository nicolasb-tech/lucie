'use client';
import React, { useState } from 'react';
import { emails, getProject } from '@/data/mockData';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

type Priority = 'critical' | 'high' | 'medium' | 'low';

type EmailState = {
  isRead: boolean;
  replied: boolean;
  ignored: boolean;
  replyText: string;
  sent: boolean;
};

function priorityLabel(p: string) {
  return p === 'critical' ? 'Critique' : p === 'high' ? 'Haute' : p === 'medium' ? 'Moyenne' : 'Basse';
}

export function EmailsTab() {
  const [emailStates, setEmailStates] = useState<Record<string, EmailState>>(
    Object.fromEntries(
      emails.map((e) => [e.id, { isRead: e.isRead, replied: false, ignored: false, replyText: e.aiSuggestedReply, sent: false }])
    )
  );

  // Desktop: selected email shown in right pane
  const [selected, setSelected] = useState<(typeof emails)[0] | null>(emails[0]);
  // Mobile: email detail sheet
  const [detailSheet, setDetailSheet] = useState<(typeof emails)[0] | null>(null);
  // Reply modal (both mobile + desktop)
  const [replyTarget, setReplyTarget] = useState<(typeof emails)[0] | null>(null);

  const markRead = (id: string) =>
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], isRead: true } }));

  const ignore = (id: string) =>
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], ignored: true } }));

  const sendReply = (id: string) => {
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], sent: true, replied: true, isRead: true } }));
    setReplyTarget(null);
  };

  const updateReply = (id: string, text: string) =>
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], replyText: text } }));

  const openDetail = (email: (typeof emails)[0], isMobile: boolean) => {
    markRead(email.id);
    if (isMobile) {
      setDetailSheet(email);
    } else {
      setSelected(email);
    }
  };

  const openReply = (email: (typeof emails)[0]) => {
    setReplyTarget(email);
  };

  const unreadCount = emails.filter((e) => !emailStates[e.id]?.isRead).length;

  const EmailList = ({ onSelect, activeId }: { onSelect: (e: (typeof emails)[0]) => void; activeId?: string }) => (
    <div className="divide-y divide-black/[0.04]">
      {emails.map((email) => {
        const state = emailStates[email.id];
        const isActive = activeId === email.id;
        const project = getProject(email.project);
        return (
          <button
            key={email.id}
            className={`w-full text-left px-4 py-3.5 transition-colors ${
              isActive ? 'bg-indigo-50/80' : 'hover:bg-black/[0.025]'
            } ${state.ignored ? 'opacity-40' : ''}`}
            onClick={() => onSelect(email)}
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
                <div className={`w-2 h-2 rounded-full transition-colors ${!state.isRead ? 'bg-indigo-500' : 'bg-transparent'}`} />
              </div>
              <Avatar initials={email.senderAvatar} color={email.senderColor} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm ${state.isRead ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                    {email.sender}
                  </span>
                  <span className="text-[11px] text-gray-400 shrink-0">{email.receivedAt}</span>
                </div>
                <p className={`text-xs mt-0.5 truncate ${state.isRead ? 'text-gray-400' : 'text-gray-700 font-medium'}`}>
                  {email.subject}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant={email.priority as Priority}>{priorityLabel(email.priority)}</Badge>
                  {state.replied && <Badge variant="success">Répondu</Badge>}
                  {state.ignored && <Badge variant="neutral">Ignoré</Badge>}
                  {project && (
                    <span className="flex items-center gap-1 text-[10px] text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                      {project.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  const EmailDetail = ({ email, onReply, onIgnore }: {
    email: (typeof emails)[0];
    onReply: () => void;
    onIgnore: () => void;
  }) => {
    const state = emailStates[email.id];
    const project = getProject(email.project);
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-5 border-b border-black/[0.06] shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 text-base leading-snug">{email.subject}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Avatar initials={email.senderAvatar} color={email.senderColor} size="sm" />
                <span className="text-sm font-medium text-gray-800">{email.sender}</span>
                <span className="text-xs text-gray-400">{email.receivedAt}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Badge variant={email.priority as Priority}>{priorityLabel(email.priority)}</Badge>
              {project && (
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  {project.name}
                </span>
              )}
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {state.replied ? (
              <Badge variant="success">✓ Répondu</Badge>
            ) : (
              <Button size="sm" variant="primary" onClick={onReply}>
                Répondre →
              </Button>
            )}
            {!state.ignored && (
              <Button size="sm" variant="ghost" onClick={onIgnore}>
                Ignorer
              </Button>
            )}
          </div>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
            {email.body}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ── Desktop layout ── */}
      <div className="hidden md:flex h-[calc(100dvh-10rem)] bg-white rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
        {/* Email list */}
        <div className="w-72 shrink-0 border-r border-black/[0.05] flex flex-col overflow-hidden">
          <div className="px-4 py-3.5 border-b border-black/[0.05] shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Boîte de réception</h2>
              {unreadCount > 0 && (
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Filtrés par l&apos;IA</p>
          </div>
          <div className="overflow-y-auto flex-1">
            <EmailList onSelect={(e) => openDetail(e, false)} activeId={selected?.id} />
          </div>
        </div>

        {/* Email detail */}
        <div className="flex-1 overflow-hidden">
          {selected ? (
            <EmailDetail
              email={selected}
              onReply={() => openReply(selected)}
              onIgnore={() => ignore(selected.id)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center h-full">
              <p className="text-sm text-gray-400">Sélectionner un email</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Boîte de réception</h2>
          {unreadCount > 0 && (
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <EmailList onSelect={(e) => openDetail(e, true)} />
        </div>
      </div>

      {/* ── Mobile: email detail sheet ── */}
      <Modal
        open={!!detailSheet}
        onClose={() => setDetailSheet(null)}
        title=""
        width="lg"
        variant="sheet"
      >
        {detailSheet && (
          <EmailDetail
            email={detailSheet}
            onReply={() => openReply(detailSheet)}
            onIgnore={() => { ignore(detailSheet.id); setDetailSheet(null); }}
          />
        )}
      </Modal>

      {/* ── Reply modal (mobile + desktop) ── */}
      <Modal
        open={!!replyTarget}
        onClose={() => setReplyTarget(null)}
        title="Répondre"
        width="md"
        variant="sheet"
      >
        {replyTarget && (
          <div className="space-y-4">
            {/* To */}
            <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-400 shrink-0">À</span>
              <div className="flex items-center gap-2">
                <Avatar initials={replyTarget.senderAvatar} color={replyTarget.senderColor} size="sm" />
                <span className="text-sm font-medium text-gray-800">{replyTarget.sender}</span>
              </div>
            </div>

            {/* AI label */}
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-indigo-600 rounded-md flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs text-gray-400">Brouillon généré par l&apos;IA · modifiable</span>
            </div>

            {/* Textarea */}
            {emailStates[replyTarget.id]?.sent ? (
              <div className="bg-emerald-50 rounded-2xl p-4">
                <p className="text-sm font-medium text-emerald-700 mb-2">✓ Réponse envoyée</p>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
                  {emailStates[replyTarget.id]?.replyText}
                </pre>
              </div>
            ) : (
              <>
                <textarea
                  className="w-full text-sm text-gray-800 leading-relaxed bg-gray-50 rounded-2xl p-4 resize-none min-h-[220px] font-sans"
                  value={emailStates[replyTarget.id]?.replyText ?? ''}
                  onChange={(e) => updateReply(replyTarget.id, e.target.value)}
                  placeholder="Réponse…"
                />
                <div className="flex items-center justify-between">
                  <button
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => updateReply(replyTarget.id, replyTarget.aiSuggestedReply)}
                  >
                    Réinitialiser
                  </button>
                  <Button variant="primary" size="sm" onClick={() => sendReply(replyTarget.id)}>
                    Envoyer →
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
