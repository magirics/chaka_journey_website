'use client';

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CommentsChatProps = {
    items: Array<{ name: string, comment: string }>
};

const commentsTitleByLocale: Record<string, string> = {
    es: 'Cuéntanos qué te parece Chaka',
    en: 'Tell us what you think about Chaka',
    fr: 'Dis-nous ce que tu penses de Chaka',
    de: 'Erzähl uns, was du von Chaka hältst',
};

export default function CommentsChat({ items }: CommentsChatProps) {
    const router = useRouter();
    const locale = useLocale();
    const commentsTitle = commentsTitleByLocale[locale] || commentsTitleByLocale.en;

    const [comments, setComments] = useState<Array<{ name: string, comment: string }>>(items);
    const [name, setName] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setComments(items);
    }, [items]);

    const onSendHandle = async () => {
        const trimmedName = name.trim();
        const trimmedComment = comment.trim();

        if (trimmedName === '' || trimmedComment === '' || isSubmitting) {
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: trimmedName,
                    comment: trimmedComment,
                    locale,
                }),
            });

            if (!response.ok) {
                throw new Error('No se pudo guardar el comentario');
            }

            setComments((currentComments) => [...currentComments, { name: trimmedName, comment: trimmedComment }]);
            setComment('');
            router.refresh();
        } catch {
            setError('No se pudo guardar el comentario. Intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return <div className="w-full px-4 md:w-200">
        <h3 className="mb-3 text-lg font-semibold">{commentsTitle}</h3>
        <div className="relative max-h-110 w-full pb-8 overflow-hidden flex flex-col justify-end">
            <div
                className="absolute w-full left-0 top-0 h-10 z-10 "
                style={{ backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))" }}
            />

            <ul className="list bg-base-100 rounded-box shadow-md">
                {comments.map(({ name, comment }, i) =>
                    <li key={i} className="list-row">
                        <div>{name}</div>
                        <div className="list-col-wrap text-xs">
                            {comment}
                        </div>
                    </li>
                )}

                <li className="list-row">
                    <div>
                        <input
                            className="w-80 resize-none focus:p-2 transition-all duration-200 ease-in-out"
                            placeholder="Name Here!"
                            maxLength={40}
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
                    <div className="list-col-wrap text-xs col-span-2">
                        <div className="flex flex-row">
                            <textarea
                                className="field-sizing-content grow resize-none focus:p-2 transition-all duration-200 ease-in-out"
                                placeholder="Comment Here!"
                                rows={3}
                                value={comment}
                                onChange={event => setComment(event.target.value)}
                            />

                            <button className="btn btn-square btn-ghost ml-2" onClick={onSendHandle} disabled={isSubmitting}>
                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
                            </button>
                        </div>
                        {error ? <p className="mt-2 text-error">{error}</p> : null}
                    </div>
                </li>
            </ul>
        </div>

    </div >
}