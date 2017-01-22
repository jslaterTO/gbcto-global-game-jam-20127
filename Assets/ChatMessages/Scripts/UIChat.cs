using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class UIChat : MonoBehaviour
{
    [SerializeField] private UIChatMessageItem _messageItemPlayerPrefab;
    [SerializeField] private UIChatMessageItem _messageItemOtherPrefab;

    [SerializeField] private VerticalLayoutGroup _vLayout;
    [SerializeField] private InputField _inputField;

    [SerializeField] private UIChatBot _bot;

    private List<UIChatMessageItem> _messageItems;

    /// <summary>
    /// Adds a new message item to the UI.
    /// </summary>
    /// <param name="message">The message to add</param>
    /// <param name="playerMessage">If the messsage is from the player</param>
    public void AddMessage(string message, bool playerMessage)
    {
        UIChatMessageItem messageItem = CreateMessageItem(_vLayout, playerMessage);
        messageItem.SetMessage(message);
        
        if (_messageItems == null)
        {
            _messageItems = new List<UIChatMessageItem>();
        }

        _messageItems.Add(messageItem);

        if (playerMessage)
        {
            _bot.Reply(message);
        }
    }

    /// <summary>
    /// Instantiate and add a new message item to the layout.
    /// </summary>
    /// <param name="vLayout">The Vertical Layout to add the message item.</param>
    /// <param name="playerMessage">If the message is from the player.</param>
    /// <returns></returns>
    private UIChatMessageItem CreateMessageItem(VerticalLayoutGroup vLayout, bool playerMessage)
    {
        GameObject prefab = playerMessage ? _messageItemPlayerPrefab.gameObject : _messageItemOtherPrefab.gameObject;

        GameObject instance = (GameObject)Instantiate(prefab, Vector3.zero, Quaternion.identity);
        instance.transform.SetParent(vLayout.transform);
        instance.transform.localScale = Vector3.one;
        instance.SetActive(true);

        return instance.GetComponent<UIChatMessageItem>();
    }

    /// <summary>
    /// Sends the message writen on the input field, if not empty.
    /// </summary>
    private void SendMessage()
    {
        string message = _inputField.text;

        if (!string.IsNullOrEmpty(message))
        {
            AddMessage(message, true);

            _inputField.text = "";
        }
    }

    #region UI EVENT Send Message
        
    /// <summary>
    /// UI EVENT: Called from the Send Message Button
    /// </summary>
    public void OnClickSendMessageButton()
    {
        SendMessage();
    }

    #endregion

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Return))
        {
            SendMessage();
        }
    }
}
