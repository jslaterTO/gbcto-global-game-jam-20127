using UnityEngine;
using System.Collections;

public class UIChatBot : MonoBehaviour
{
    [SerializeField] private UIChat _chat;

    public string[] Messages;

    private int _currentMessage = -1;
    private bool offline;

    /// <summary>
    /// Add a new message to the chat from the bot.
    /// </summary>
    /// <param name="message"></param>
    public void Reply(string message)
    {
        if (!offline)
        {
            if (_currentMessage < 1)
            {
                _currentMessage++;
            }
            else
            {
                if (message.ToLower() == "heisenberg")
                {
                    _currentMessage++;
                    offline = true;
                }
            }

            StartCoroutine(CoReply(Messages[_currentMessage]));
        }
    }

    /// <summary>
    /// Wait a random time before sending the reply.
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    private IEnumerator CoReply(string message)
    {
        yield return new WaitForSeconds(Random.Range(0.1f, 0.3f));

        _chat.AddMessage(message, false);
    }
}
