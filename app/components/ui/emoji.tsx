import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  return `https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-apple/15.0.1/img/${style}/64/${unified}.png`;
}

export function EmojiAvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}

export function BotAvatar(props: { avatar: string }) {
  const { avatar } = props;
  return <EmojiAvatar avatar={avatar} />;
}

export function BotAvatarLarge(props: { avatar: string }) {
  const { avatar } = props;
  return <EmojiAvatar avatar={avatar} size={72} />;
}
