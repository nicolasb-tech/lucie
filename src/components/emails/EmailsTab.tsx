'use client';
import React, { useState } from 'react';
import { emails, getProject } from '@/data/mockData';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type Priority = 'critical' | 'high' | 'medium' | 'low';

type EmailState = {
  isRead: boolean;
  replied: boolean;
  ignored: boolean;
  replyText: string;
  sent: boolean;
};

export function EmailsTab() {
  const [emailStates, setEmailStates] = useState<Record<string, EmailState>>(
    Object.fromEntries(
      emails.map((e) => [
        e.id,
        { isRead: e.isRead, replied: false, ignored: false, replyText: e.aiSuggestedReply, sent: false },
      ])
    )
  );
  const [selected, setSelected] = useState<(typeof emails)[0] | null>(emails[0]);

  const markRead = (id: string) =>
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], isRead: true } }));

  const select = (email: (typeof emails)[0]) => {
    setSelected(email);
    markRead(email.id);
  };

  const ignore = (id: string) =>
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], ignored: true } }));

  const sendReply = (id: string) =>
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], sent: true, replied: true, isRead: true } }));

  const updateReply = (id: string, text: string) =>
    setEmailStates((s) => ({ ...s, [id]: { ...s[id], replyText: text } }));

  const unreadCount = emails.filter((e) => !emailStates[e.id]?.isRead).length;

  return (
    <div className="flex gap-0 h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
      {/* Email list */}
      <div className="w-80 shrink-0 border-r border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Inbox</h2>
            <span className="text-xs text-gray-400">{unreadCount} unread</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">AI-filtered: important only</p>
        </div>

        <div className="overflow-y-auto flex-1">
          {emails.map((email) => {
            const state = emailStates[email.id];
            const isActive = selected?.id === email.id;
            const project = getProject(email.project);
            return (
              <button
                key={email.id}
                className={`w-full text-left p-4 border-b border-gray-50 transition-colors ${
                  isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'
                } ${state.ignored ? 'opacity-40' : ''}`}
                onClick={() => select(email)}
              >
                <div className="flex items-start gap-3">
                  {!state.isRead && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  )}
                  {state.isRead && <div className="w-1.5 h-1.5 mt-2 shrink-0" />}
                  <Avatar initials={email.senderAvatar} color={email.senderColor} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs ${state.isRead ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                        {email.sender}
                      </span>
                      <span className="text-[10px] text-gray-400 shrink-0">{email.receivedAt}</span>
                    </div>
                    <p className={`text-xs mt-0.5 leading-snug truncate ${state.isRead ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                      {email.subject}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug line-clamp-2">
                      {email.summary}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge variant={email.priority as Priority}>{email.priority}</Badge>
                      {state.replied && <Badge variant="success">Replied</Badge>}
                      {state.ignored && <Badge variant="neutral">Ignored</Badge>}
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
      </div>

      {/* Email detail + AI panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selected ? (
          <>
            {/* Email header */}
            <div className="p-5 border-b border-gray-100 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-gray-900 text-base leading-snug">{selected.subject}</h2>
                  <div className="flex items-center gap-3 mt-1.5">
                    <Avatar initials={selected.senderAvatar} color={selected.senderColor} size="sm" />
                    <div>
                      <span className="text-sm font-medium text-gray-800">{selected.sender}</span>
                      <span className="text-xs text-gray-400 ml-2">{selected.senderEmail}</span>
                    </div>
                    <span className="text-xs text-gray-400">{selected.receivedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={selected.priority as Priority}>{selected.priority}</Badge>
                  {emailStates[selected.id]?.replied && <Badge variant="success">Replied</Badge>}
                </div>
              </div>
              {/* Suggested actions */}
              <div className="flex items-center gap-2 mt-3">
                {selected.suggestedActions.map((action) => (
                  <Button
                    key={action}
                    size="xs"
                    variant={action === 'Reply' ? 'primary' : action === 'Ignore' ? 'ghost' : 'secondary'}
                    onClick={() => action === 'Ignore' && ignore(selected.id)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>

            {/* Email body */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-5">
                {/* Original message */}
                <div className="prose prose-sm max-w-none">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">
                    {selected.body}
                  </pre>
                </div>

                {/* AI Response Panel */}
                <div className="mt-5 rounded-2xl border border-indigo-100 overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-indigo-800">AI Draft Reply</span>
                    </div>
                    {emailStates[selected.id]?.sent && (
                      <Badge variant="success">Sent ✓</Badge>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    {emailStates[selected.id]?.sent ? (
                      <div className="text-sm text-gray-600 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <p className="font-medium text-emerald-700 mb-2">✓ Reply sent successfully</p>
                        <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
                          {emailStates[selected.id]?.replyText}
                        </pre>
                      </div>
                    ) : (
                      <>
                        <textarea
                          className="w-full text-sm text-gray-800 leading-relaxed bg-transparent border-0 outline-none resize-none min-h-[180px] font-sans"
                          value={emailStates[selected.id]?.replyText ?? ''}
                          onChange={(e) => updateReply(selected.id, e.target.value)}
                          placeholder="AI-generated reply..."
                        />
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <p className="text-xs text-indigo-400">✨ AI generated · editable</p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateReply(selected.id, selected.aiSuggestedReply)}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => sendReply(selected.id)}
                            >
                              Send reply →
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-gray-400">Select an email to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
